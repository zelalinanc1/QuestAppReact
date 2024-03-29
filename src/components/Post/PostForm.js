import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { PostWithAuth } from "../../services/HttpService";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const linkStyle = {
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
};

function PostForm(props) {
  const {userId, userName, refreshPosts} = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [title,setTitle] = useState("");
  const [text,setText] = useState("");
  const [isSent,setIsSent] = useState(false);

  const savePost = () => {
    PostWithAuth("/posts",{
      title: title,
      userId : userId,
      text : text,
    })
    .then((res) =>res.json())
    .catch((err) =>console.log("error"))
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleLike = () => {
    setLiked(!liked);
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  }

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);

  }

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };


   return(
      
      <div className="postContainer">
        <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Your post is sent!
  </Alert>
</Snackbar>
      <Card sx={{ maxWidth: 800,}}>
                <CardHeader
                    avatar={
                      <Link to={{ pathname: "/users/" + userId }} style={linkStyle}>
                    <Avatar aria-label="recipe" >
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Link>
                    }
                    title= {<OutlinedInput
                    id="outlined-adornment-amount"
                    multiline
                    placeholder = "Title"
                    inputProps = {{maxLength : 25}}
                    fullWidth
                    value = {title}
                    onChange = { (i) => handleTitle(i.target.value)}
                    >    
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    <OutlinedInput
                    id="outlined-adornment-amount"
                    multiline
                    placeholder = "Text"
                    inputProps = {{maxLength : 250}}
                    fullWidth
                    value = {text}
                    onChange = { (i) => handleText(i.target.value)}
                    endAdornment = {
                        <InputAdornment position = "end">
                        <Button
                        variant = "contained"
                        style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white'}}
                        onClick = {handleSubmit}
                        >Post</Button>
                        </InputAdornment>
                    }
                    >    
                    </OutlinedInput>
                    </Typography>
                </CardContent>
                </Card>
       </div>
   )
}

export default PostForm;