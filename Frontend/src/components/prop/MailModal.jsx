import React, { useState } from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Typography,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SelectUserMail from '../inputs/SelectUserMail'; 

const MailModal = ({ open, handleClose, title, recipient, type, data }) => {
  const [subject, setSubject] = useState(title || '');
  const [recipients, setRecipients] = useState(recipient ? [recipient] : []); 
  const [emailType, setEmailType] = useState(type || 'defect');
  const [body, setBody] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('to', recipients.join(',')); 
    formData.append('type', emailType);
    formData.append('body', body);
    formData.append('data', JSON.stringify(data));
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await fetch('/api/emails/send-email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success) {
        alert('Email sent successfully!');
        handleClose();
      } else {
        alert(`Failed to send email: ${result.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

  const handleAttachmentChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setAttachment(file);

      // Create a preview URL for images or PDFs
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        setAttachmentPreview(URL.createObjectURL(file));
      } else if (fileType === 'application/pdf') {
        setAttachmentPreview(URL.createObjectURL(file));
      } else {
        setAttachmentPreview(null); // Unsupported type, do not preview
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', 
            bgcolor: '#333', 
            color: '#fff',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Send Email
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectUserMail recipients={recipients} setRecipients={setRecipients} /> 
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label" style={{ color: '#fff' }}>
                  Type
                </InputLabel>
                <Select
                  labelId="type-select-label"
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                >
                  <MenuItem value="defect">Defect</MenuItem>
                  <MenuItem value="document">Document</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="log">Log</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<AttachFileIcon />}
              >
                Upload Attachment
                <input
                  type="file"
                  hidden
                  onChange={handleAttachmentChange}
                />
              </Button>
              {attachment && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Attached: {attachment.name}
                </Typography>
              )}
            </Grid>
            {attachmentPreview && (
              <Grid item xs={12}>
                <Card sx={{ bgcolor: '#444', borderRadius: 1, mb: 2 }}>
                  {attachment.type.startsWith('image/') ? (
                    <CardMedia
                      component="img"
                      image={attachmentPreview}
                      alt="Attachment Preview"
                      sx={{ maxHeight: 200 }}
                    />
                  ) : attachment.type === 'application/pdf' ? (
                    <CardContent>
                      <PictureAsPdfIcon fontSize="large" sx={{ color: '#fff' }} />
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        PDF Preview
                      </Typography>
                      <Button
                        variant="contained"
                        href={attachmentPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 1 }}
                      >
                        Open PDF
                      </Button>
                    </CardContent>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      No preview available for this file type.
                    </Typography>
                  )}
                </Card>
              </Grid>
            )}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendEmail}
                fullWidth
              >
                Send Email
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MailModal;
