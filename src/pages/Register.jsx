import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Here you would typically make an API call to your backend
        console.log('Registration attempt with:', formData);
        // For now, we'll just simulate a successful registration
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({
          submit: 'Registration failed. Please try again.'
        });
      }
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
            required
          />

          {errors.submit && (
            <Typography color="error" align="center" className="error-message">
              {errors.submit}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className="submit-button"
          >
            Register
          </Button>
        </form>

        <Box className="auth-links">
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register; 