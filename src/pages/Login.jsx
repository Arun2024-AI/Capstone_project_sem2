import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Here you would typically make an API call to your backend
        console.log('Login attempt with:', formData);
        // For now, we'll just simulate a successful login
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({
          submit: 'Login failed. Please check your credentials.'
        });
      }
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        
        <form onSubmit={handleSubmit} className="auth-form">
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
            Login
          </Button>
        </form>

        <Box className="auth-links">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login; 