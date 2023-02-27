import React from 'react'
import { CardContent, InputAdornment, OutlinedInput, Avatar} from '@mui/material';
import { Link } from "react-router-dom";


const linkStyle = {
    textDecoration : "none",
    boxShadow : "none",
    color : "white"

};

const comment = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent : "flex-start",
    alignItems : "center",
  };



 function Comment(props) {

    

    const {text,userId,userName} = props;
  return (
    <CardContent className ="comment">

    <OutlinedInput
    disabled
    id="outlined-adornment-amount"
    multiline
    inputProps = {{maxLength : 25}}
    fullWidth     
    value = {text} 
    startAdornment = {
        <InputAdornment position="start">
              <Link to={{ pathname: "/users/" + userId }} style={linkStyle}>
                <Avatar aria-label="recipe" className="small">
                    {userName.charAt(0).toUpperCase()}
                </Avatar>
            </Link>
        </InputAdornment>
    }
    style = {{ color : "black",backgroundColor: 'white'}}
    ></OutlinedInput>
    </CardContent>
  )
}

export default Comment;