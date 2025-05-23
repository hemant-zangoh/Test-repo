import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import axios from 'axios';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setError('Invalid or missing verification token');
      setLoading(false);
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      await axios.get(`/api/auth/verify/${token}`);
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', textAlign: 'center' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Email Verification
          </Typography>
          
          {loading && (
            <Box sx={{ mt: 3 }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Verifying your email...
              </Typography>
            </Box>
          )}
          
          {error && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
              <Typography variant="body2" color="text.secondary">
                Please contact support if you continue to have issues.
              </Typography>
            </Box>
          )}
          
          {success && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Your email has been verified successfully!
              </Alert>
              <Typography variant="body1" sx={{ mb: 3 }}>
                You can now log in to your account.
              </Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" fullWidth>
                  Go to Login
                </Button>
              </Link>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default VerifyEmail;