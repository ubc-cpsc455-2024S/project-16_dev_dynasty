const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const House = require('../models/House');
const Defect = require('../models/Defects');

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
      console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
});

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
    console.log("------------------------------------------------here");
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const house = await House.findById(req.params.houseId);
    if (!house) {
      console.log("House not found");
      return res.status(404).json({ message: 'House not found' });
    }

    const { title, description } = req.body;
    const bay_id = house.bay_id || req.body.bay_id; // Default to house's bay_id if not provided

    if (!title || !description || !bay_id) {
      console.log("Missing required fields");
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (req.files.length === 0) {
      console.log("No images uploaded");
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imageUrls = req.files.map((file) => file.location);
    console.log("Image URLs:", imageUrls);

    const newDefect = {
      title,
      images: imageUrls,
      status: 'incomplete',
      description,
      bay_id,
    };

    house.defects.push(newDefect);
    await house.save();
    console.log("Defect added to house and house saved");

    res.status(201).json({ message: 'Defect created successfully', defect: newDefect });
  } catch (err) {
    console.error("Error creating defect:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update a defect
router.put('/:houseId/:defectId', upload.array('images', 10), async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId).populate('defects');
    if (!house) return res.status(404).json({ message: 'House not found' });

    const defect = await Defect.findById(req.params.defectId);
    if (!defect) return res.status(404).json({ message: 'Defect not found' });

    const { title, status, description, bay_id } = req.body;
    if (title) defect.title = title;
    if (status) defect.status = status;
    if (description) defect.description = description;
    if (bay_id) defect.bay_id = bay_id;

    const imageUrls = req.files.map((file) => file.location);
    if (imageUrls.length > 0) defect.images.push(...imageUrls);

    await defect.save();

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

    const defectIndex = house.defects.indexOf(req.params.defectId);
    if (defectIndex > -1) {
      house.defects.splice(defectIndex, 1);
      await house.save();
      await Defect.findByIdAndDelete(req.params.defectId);
    }

    res.status(200).json({ message: 'Defect deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
