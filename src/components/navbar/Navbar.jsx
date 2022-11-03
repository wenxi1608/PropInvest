import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = (props) => {
 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user_token")
    props.setTokenState(null)
    if (localStorage.getItem("user_token") !== null) {
      toast.error("Logout unsuccessful, please try again")
    } else {
      toast.success("You are now logged out");
      navigate("/");
    }
  }   

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <MapsHomeWorkRoundedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PropInvest
          </Typography>

          <Box>
            {
              !props.tokenState? (
                <div>
                  <Button color="inherit" href="/login">Login</Button>
                  <Button variant="contained" href="/register">Sign Up</Button>
                </div>
              ) : (
                <div>
                  <Link to={"/projects"} style={{
                  padding: "6px 20px",
                  color: "white",
                  textDecoration: "none",
                }}>Find Properties</Link>
                  <Link to={"/watchlist"} style={{
                  padding: "6px 4px",
                  color: "white",
                  textDecoration: "none",
                }}>Watchlist</Link>
                <Link to={"/calculator"} style={{
                  padding: "6px 20px",
                  color: "white",
                  textDecoration: "none",
                }}>Calculator</Link>
                  <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
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
                  <MenuItem>
                    <Link to={"/dashboard"} style={{textDecoration: "none", color: "black"}}>Dashboard</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={"/profile"} style={{textDecoration: "none", color: "black"}}>Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
                </div>
              )
            }

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;



