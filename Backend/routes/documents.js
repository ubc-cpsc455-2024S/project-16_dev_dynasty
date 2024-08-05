const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const House = require('../models/House');
require('dotenv').config();

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
    ContentDisposition:'inline',
    ContentType:'application/pdf',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
});

const deleteS3File = (key) => {
  return s3.deleteObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  }).promise();
};

// Get all documents for a house
router.get('/:houseId/documents', async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });
    res.status(200).json(house.documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific document
router.get('/:houseId/documents/:documentId', async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const document = house.documents.id(req.params.documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new document for a house
router.post('/:houseId/documents', upload.single('file'), async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const { title, type, description } = req.body;

    if (!title || !type || !description || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newDocument = {
      title,
      type,
      description,
      uploadDate: new Date(),
      fileUrl: req.file.location,
    };

    house.documents.push(newDocument);
    await house.save();

    res.status(201).json({ message: 'Document created successfully', document: newDocument });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put('/:houseId/documents/:documentId', upload.single('file'), async (req, res) => {
  try {
    const house = await House.findById(req.params.houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const document = house.documents.id(req.params.documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const { title, type, description } = req.body;
    
    if (req.file) {
      const oldFileKey = document.fileUrl.split('/').pop();
      await deleteS3File(oldFileKey);
      document.fileUrl = req.file.location;
    }
    
    if (title) document.title = title;
    if (type) document.type = type;
    if (description) document.description = description;

    document.uploadDate = new Date();

    await house.save();

    res.status(200).json({ message: 'Document updated successfully', document });
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a document
router.delete('/:houseId/documents/:documentId', async (req, res) => {
  try {
    console.log("Delete Request Received");
    console.log("House ID:", req.params.houseId);
    console.log("Document ID:", req.params.documentId);

    const house = await House.findById(req.params.houseId);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    const documentIndex = house.documents.findIndex(doc => doc._id.toString() === req.params.documentId);
    if (documentIndex === -1) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const document = house.documents[documentIndex];
    const fileKey = document.fileUrl.split('/').pop(); 
    await deleteS3File(fileKey); 

    house.documents.splice(documentIndex, 1);

    await house.save();

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
