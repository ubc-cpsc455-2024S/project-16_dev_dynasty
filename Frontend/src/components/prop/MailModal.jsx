import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import SelectUserMail from "../inputs/SelectUserMail";
import { getUsersAsync } from "../../redux/auth/thunkAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MailModal = ({
  open,
  handleClose,
  title,
  recipient,
  type,
  data,
  images,
}) => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState(title || "");
  const [recipients, setRecipients] = useState(recipient ? [recipient] : []);
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]); 

  useEffect(() => {
    if (open) {
      dispatch(getUsersAsync());
      if (type === "defect") {
        setBody(`Hello Team,

The QA team has identified some defects in the project that require your attention. Please review the attached defect checklist and the included image for more details.

**Summary of Defects:**
- [Brief description of defects]
- [Additional details or observations]

**Action Required:**
Please investigate the issues and take the necessary steps to resolve them as soon as possible. If you have any questions or need further clarification, feel free to reach out.
`);
      }
    }
  }, [open, dispatch, type]);

  const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("to", recipients.join(","));
    formData.append("type", "defect");
    formData.append("body", body);
    formData.append("data", JSON.stringify(data));

    files.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/emails/send-email`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const result = response.data;
      console.log(result);
      console.log(response);
      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        toast.error(`Failed to send email: ${result.message || 'An unknown error occurred.'}`);
      }
    } catch (error) {
      toast.error(`Error sending email: ${error.response?.data?.message || error.message || 'An unknown error occurred.'}`);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              bgcolor: "#333",
              color: "#fff",
              border: "2px solid #000",
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
                <SelectUserMail
                  recipients={recipients}
                  setRecipients={setRecipients}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  label="Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Files
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {files.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {files.length} file(s) selected
                  </Typography>
                )}
              </Grid>

              {files.length > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {files.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#444',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          width: 'fit-content',
                        }}
                      >
                        <AttachmentIcon sx={{ color: "#fff", mr: 1 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#fff",
                            maxWidth: '150px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={file.name}
                        >
                          {file.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFile(index)}
                          sx={{ color: "#fff", ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
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
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default MailModal;
