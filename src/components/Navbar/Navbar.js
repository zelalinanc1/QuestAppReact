import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";


const linkStyle = {
     textDecoration : "none",
     boxShadow : "none",
     color : "white"

 };
function Navbar() {

  const navigate = useNavigate();
 

  const onClick = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    navigate(0); 
    //
  }
   

    return(
        <div>
          <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"left" }}>
          <Link to ="/" style={linkStyle}>Home</Link>
          </Typography>
          <Typography variant="h6">
          {localStorage.getItem("currentUser") == null ? <Link to="/auth" style={linkStyle}>Login/Register</Link>:
             <div><IconButton style={linkStyle} onClick = {onClick}><LockOpen></LockOpen></IconButton>
            <Link  style={linkStyle} to={{pathname : '/users/' + localStorage.getItem("currentUser")}}>Profile</Link>
            </div>}
          
          {/* <Link to ={{pathname : '/users/' + userId}} style={linkStyle}>Profile</Link> */}
          </Typography>
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default Navbar;
