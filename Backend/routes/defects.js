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
  region: process.env.AWS_REGION
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
    }
  })
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
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const defect = house.defects.id(req.params.defectId);
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
    if (!house) return res.status(404).json({ message: 'House not found' });

    const { title, status, description, bay_id } = req.body;
    const imageUrls = req.files.map(file => file.location);

    const newDefect = new Defect({
      title,
      images: imageUrls,
      status,
      description,
      bay_id,
      created_date: new Date(),
    });

    house.defects.push(newDefect);
    await house.save();

    res.status(201).json({ message: 'Defect created successfully', defect: newDefect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a defect
router.put('/:houseId/:defectId', upload.array('images', 10), async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const defect = house.defects.id(req.params.defectId);
    if (!defect) return res.status(404).json({ message: 'Defect not found' });

    const { title, status, description, bay_id, resolved_date } = req.body;
    if (title) defect.title = title;
    if (status) defect.status = status;
    if (description) defect.description = description;
    if (bay_id) defect.bay_id = bay_id;
    if (resolved_date) defect.resolved_date = resolved_date;

    const imageUrls = req.files.map(file => file.location);
    if (imageUrls.length > 0) defect.images.push(...imageUrls);

    await house.save();

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

    const defect = house.defects.id(req.params.defectId);
    if (!defect) return res.status(404).json({ message: 'Defect not found' });

    defect.remove();
    await house.save();

    res.status(200).json({ message: 'Defect deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
