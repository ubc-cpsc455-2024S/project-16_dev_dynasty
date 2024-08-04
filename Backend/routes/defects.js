const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const House = require('../models/House');
const Defect = require('../models/Defects');
require('dotenv').config();
const { addLogToDb } = require('../services/logServices');
const { model } = require('mongoose');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
});


const deleteImagesFromS3 = async (imageUrls) => {
  const keys = imageUrls.map(imageUrl => {
    const urlParts = imageUrl.split('/');
    return urlParts[urlParts.length - 1]; 
  });

  const deleteParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Delete: {
      Objects: keys.map(key => ({ Key: key })),
    },
  };

  try {
    await s3.deleteObjects(deleteParams).promise();
  } catch (err) {
    throw err; 
  }
};

// Get all defects for a house
router.get('/:houseId', async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId).populate('defects');
    if (!house) return res.status(404).json({ message: 'House not found' });
    res.status(200).json(house.defects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific defect
router.get('/:houseId/:defectId', async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId).populate('defects');
    if (!house) return res.status(404).json({ message: 'House not found' });

    const defect = await Defect.findById(req.params.defectId);
    if (!defect) return res.status(404).json({ message: 'Defect not found' });

    res.status(200).json(defect);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new defect for a house
router.post('/:houseId', upload.array('images', 10), async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    const { title, description } = req.body;
    const bay_id = house.bay_id || req.body.bay_id; // Default to house's bay_id if not provided

    if (!title || !description || !bay_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imageUrls = req.files.map((file) => file.location);

    const newDefect = {
      title,
      images: imageUrls,
      status: 'Incomplete',
      description,
      bay_id,
    };

    house.defects.push(newDefect);
    await house.save();

    const logParams = {
      defectTitle: title,
      houseNpl: house.npl, bayId: bay_id, model: house.house_model, houseId: house._id
    }
    await addLogToDb('Defect created', logParams);

    res.status(201).json({ message: 'Defect created successfully', defect: newDefect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:houseId/:defectId', upload.array('images', 10), async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const defectIndex = house.defects.findIndex(def => def._id.toString() === req.params.defectId);
    if (defectIndex === -1) return res.status(404).json({ message: 'Defect not found' });

    const defect = house.defects[defectIndex];
    const { title, status, description, bay_id, deleted, kept } = req.body;

    // Update defect fields
    if (title) defect.title = title;
    if (status) defect.status = status;
    if (description) defect.description = description;
    if (bay_id) defect.bay_id = bay_id;

    // Handle image deletion
    const imagesToDelete = deleted ? JSON.parse(deleted) : [];
    if (imagesToDelete.length > 0) {
      await deleteImagesFromS3(imagesToDelete);
      defect.images = defect.images.filter(image => !imagesToDelete.includes(image));
    }

    // Handle new images upload
    if (req.files.length > 0) {
      defect.images = defect.images.concat(req.files.map((file) => file.location));
    }

    // Ensure that kept images are retained
    const keptImages = kept ? JSON.parse(kept) : [];
    defect.images = [...new Set([...defect.images, ...keptImages])];

    await house.save();

    // Log defect fix if status is resolved
    if (status === 'resolved') {
      const logParams = {
        defectTitle: title,
        houseNpl: house.npl, bayId: bay_id, model: house.house_model, houseId: house._id
      }
      await addLogToDb('Defect fixed', logParams);
    }

    res.status(200).json({ message: 'Defect updated successfully', defect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Delete a defect
router.delete('/:houseId/:defectId', async (req, res) => {
  try {

    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const defectIdStr = req.params.defectId.toString();
    const defectIndex = house.defects.findIndex(defect => defect._id.toString() === defectIdStr);

    if (defectIndex > -1) {
      const defect = house.defects[defectIndex];
      const images = defect.images;

      await deleteImagesFromS3(images);

      house.defects.splice(defectIndex, 1);
      await house.save();
      await Defect.findByIdAndDelete(req.params.defectId);
      return res.status(200).json({ message: 'Defect deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Defect not found in house' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
