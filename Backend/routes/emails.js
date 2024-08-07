const express = require("express");
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const multer = require("multer");
const router = express.Router();
require("dotenv").config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const upload = multer();

router.post("/send-email", upload.array("attachments"), async (req, res) => {
  const { subject, to, body, data } = req.body;
  const attachments = req.files;

  if (!to) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Recipient 'to' parameter is missing.",
      });
  }
  if (!subject) {
    return res
      .status(400)
      .json({ success: false, message: "Subject is required." });
  }
  if (!body) {
    return res
      .status(400)
      .json({ success: false, message: "Body is required." });
  }

  const parsedData = JSON.parse(data);
  const { title, images, status, description, bay_id } = parsedData;

  const formattedBody = body.replace(/\n/g, "<br>");

  const mailOptions = {
    from: "Modsolid <noreply@modsolid.com>",
    to,
    subject,
    text: body,
    html: `
      <div style="font-family: Arial, sans-serif; color: rgb(255, 255, 255); background-color: #12151F; padding: 20px;">
        <div style="background-color: #1E1F2A; padding: 15px; text-align: center; border-radius: 8px; margin-bottom: 0px;">
          <img src="https://baybuildbucket.s3.us-west-2.amazonaws.com/logo.png" alt="Company Logo" style="max-width: 300px; height: auto;">
        </div>
        <h1 style="color: rgb(245, 145, 31);">${subject}</h1>
        <div style="margin-bottom: 20px; color: rgb(255, 255, 255);">${formattedBody}</div>

        <h2 style="color: rgb(245, 145, 31);">Defect Title: ${title}</h2>
        <p style="color: rgb(255, 255, 255);"><strong>Status:</strong> ${status}</p>
        <p style="color: rgb(255, 255, 255);"><strong>Bay ID:</strong> ${bay_id}</p>
        <p style="color: rgb(255, 255, 255);"><strong>Description:</strong> ${description}</p>

        <h3 style="color: rgb(245, 145, 31);">Defect Images:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${images
            .map(
              (image) => `
                <div style="border: 1px solid #ccc; border-radius: 4px; overflow: hidden; margin: 20px;">
                  <img src="${image}" alt="Defect Image" style="width: 200px; height: 150px; object-fit: cover; display: block;">
                </div>
              `,
            )
            .join("")}
        </div>

        <p style="color: rgb(255, 255, 255);">Thank you for your cooperation.</p>
        <p style="color: rgb(255, 255, 255);">Best regards,</p>
        <p style="color: rgb(255, 255, 255);">QA Team</p>
      </div>
    `,
    attachment: attachments.map((file) => file.buffer),
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.status === 400) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        details: error.details || "The request parameters might be invalid.",
      });
    } else if (error.status === 403) {
      return res.status(403).json({
        success: false,
        message: "Can't reach recipient domain",
        details:
          error.details ||
          "Domain is not authorized to send emails. Please check your Mailgun account settings.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send email.",
        details: error.message || "An unknown error occurred.",
      });
    }
  }
});

module.exports = router;
