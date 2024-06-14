import React, {useEffect} from 'react';
import { useNavigate } from "react-router";
import { 
    Container,
    Box,
    Typography,
    Button
 } from '@mui/material';

// Own
import {useProfile} from "../hooks/auth/useProfile"

const Default: React.FC = () => {
    const {data: profileData, isLoading: profileLoading, isError: profileError} = useProfile();
    const navigate = useNavigate();

    useEffect(() => {
      if (!profileLoading && !profileError && profileData) {
        navigate(`/lists`);
      }
    }, [profileLoading, profileError,profileData, navigate]);

    return (
          <Container>
              <Typography 
                variant="h3" 
                color="primary" 
                sx={{marginTop: 3}}
              >Welcome to your shopping list app.</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                  marginTop: 3,
                  }}
              >
                  <Button 
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/signup`)}
                  >Signup</Button>
                  
                  <Button 
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/login`)}
                  >Login</Button>
            </Box>
        </Container>
    )
};

export default Default;