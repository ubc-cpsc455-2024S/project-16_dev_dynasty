import React, { useEffect, useState } from 'react';
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDispatch, useSelector } from 'react-redux';
import SelectUserMail from '../inputs/SelectUserMail';
import { getUsersAsync } from '../../redux/auth/thunkAuth';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MailModal = ({ open, handleClose, title, recipient, type, data, images }) => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState(title || '');
  const [recipients, setRecipients] = useState(recipient ? [recipient] : []);
  const [emailType, setEmailType] = useState(type || 'defect');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (open) {
      dispatch(getUsersAsync());
    }
  }, [open, dispatch]);

  const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('to', recipients.join(','));
    formData.append('type', emailType);
    formData.append('body', body);
    formData.append('data', JSON.stringify(data));
    console.log('Sending email:', formData);

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
            width: '70%',
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
            {images.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Attachments Preview
                </Typography>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '8px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                  }}
                >
                  {images.map((url, index) => (
                    <Card key={index} sx={{ bgcolor: '#444', borderRadius: 1, mb: 2 }}>
                      {url.endsWith('.pdf') ? (
                        <CardContent>
                          <PictureAsPdfIcon fontSize="large" sx={{ color: '#fff' }} />
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            PDF Attachment
                          </Typography>
                          <Button
                            variant="contained"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 1 }}
                          >
                            Open PDF
                          </Button>
                        </CardContent>
                      ) : (
                        <CardMedia
                          component="img"
                          image={url}
                          alt={`attachment-${index}`}
                          sx={{ maxHeight: 200 }}
                        />
                      )}
                    </Card>
                  ))}
                </div>
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
