import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const linkStyle = {
     textDecoration : "none",
     boxShadow : "none",
     color : "white"

 };
function Navbar() {

    let userId =1;
   

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
         
          <Link to ={{pathname : '/users/' + userId}} style={linkStyle}>User</Link>
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default Navbar;
