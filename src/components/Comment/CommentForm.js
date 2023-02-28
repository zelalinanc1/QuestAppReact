import React, { useState } from "react";
import {
  CardContent,
  InputAdornment,
  OutlinedInput,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const linkStyle = {
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
};

const comment = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
};

function CommentForm(props) {
  const { userId, userName,postId } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    fetch("/comments",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":  localStorage.getItem("tokenKey"),


      },
      body: JSON.stringify({
        postId: postId,
        userId : userId,
        text : text,
      }),
    })
    .then((res) =>res.json())
    .catch((err) =>console.log("error"))
  }



  const handleSubmit = () =>{
    saveComment();
    setText("");
  }

  const handleChange = (value) =>{
    setText(value);
  }


  return (
    <CardContent className="comment">
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link to={{ pathname: "/users/" + userId }} style={linkStyle}>
              <Avatar aria-label="recipe" className="small">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        value = {text}
        style={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
}

export default CommentForm;
