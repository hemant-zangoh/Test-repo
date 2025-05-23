import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Information
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {user?.email}
                  </Typography>
                  
                  <Typography variant="body1" gutterBottom>
                    <strong>Role:</strong>{' '}
                    <Chip
                      label={user?.role}
                      color={user?.role === 'admin' ? 'secondary' : 'primary'}
                      size="small"
                    />
                  </Typography>
                  
                  <Typography variant="body1" gutterBottom>
                    <strong>Account Status:</strong>{' '}
                    <Chip
                      label={user?.isVerified ? 'Verified' : 'Unverified'}
                      color={user?.isVerified ? 'success' : 'warning'}
                      size="small"
                    />
                  </Typography>
                  
                  <Typography variant="body1">
                    <strong>Member Since:</strong>{' '}
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Update Profile
                  </Button>
                  
                  <Button variant="outlined" color="primary" fullWidth>
                    Change Password
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="body1">
            This is a protected route that requires authentication. You can only see this
            content if you're logged in with a valid JWT token.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Dashboard;