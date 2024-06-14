import * as React from 'react';
import { useNavigate } from "react-router";
import { useQueryClient } from 'react-query';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Own
import {useProfile} from "../hooks/auth/useProfile.ts"
import useLogout from "../hooks/auth/useLogout.ts"
import {Profile} from "../models/auth.ts";


const MenuAppBar: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {data: profileData, isLoading: profileLoading, isError: profileError} = useProfile();

    const {mutate} = useLogout();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleLogout = () => {
      setAnchorEl(null);
      // @ts-expect-error Object must be void
      mutate(()=>{}, {
          onSuccess: () => {
            queryClient.invalidateQueries(['profile']).then(() => {
              // Verzögerung von 500 ms einfügen
              setTimeout(() => {
                navigate('/');
                }, 300);
          });
           }
      });
    }
    
    const name = profileData ? (profileData as Profile).name : '';
    

  
    return (
        <AppBar position="static">
          <Toolbar>
          <Typography>Your Shopping lists</Typography>
          
          <Box sx={{ flexGrow: 1 }} /> {/* Leeres flex-grow Box, um Platz zu schaffen */}
          
          {!profileError && !profileLoading  && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> {name} </Typography>
                  <AccountCircle sx={{marginLeft: 1}}/>
              </IconButton>
          )}
                
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {!profileError && !profileLoading  && (
                    <>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default MenuAppBar;