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
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const MailModal = ({ open, handleClose, title, recipient, type, data }) => {
  const [subject, setSubject] = useState(title || '');
  const [to, setTo] = useState(recipient || '');
  const [emailType, setEmailType] = useState(type || 'defect');
  const [body, setBody] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('to', to);
    formData.append('type', emailType);
    formData.append('body', body);
    formData.append('data', JSON.stringify(data));
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/emails/send-email`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  

      const result = response.data;
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
      setAttachment(event.target.files[0]);
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
            width: 500,
            bgcolor: 'background.paper',
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
              <TextField
                fullWidth
                label="Recipient"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Type</InputLabel>
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
