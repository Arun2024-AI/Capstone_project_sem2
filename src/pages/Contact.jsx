import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Snackbar, Alert } from '@mui/material';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Thank you for your message! We will get back to you soon.',
      severity: 'success',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Paper className="contact-form" elevation={0}>
        <Typography variant="body1" paragraph>
          Have questions or suggestions? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact; 