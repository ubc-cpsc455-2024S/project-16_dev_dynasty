const express = require('express');
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const multer = require('multer');
const router = express.Router();
require('dotenv').config(); 

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY, 
});

const upload = multer(); 

router.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { subject, to, type, body, data } = req.body;
  const attachment = req.file;

  const mailOptions = {
    from: 'Modsolid <noreply@modsolid.com>', 
    to,
    subject,
    text: body,
    html: `
      <h1>${type.charAt(0).toUpperCase() + type.slice(1)} Report</h1>
      <pre>${JSON.stringify(data, null, 2)}</pre>
      <p>${body}</p>
    `,
    attachment: attachment ? attachment.buffer : undefined,
  };

  try {
    console.log('Sending email with Mailgun:', mailOptions); // Debugging line
    await mg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
});

module.exports = router;
