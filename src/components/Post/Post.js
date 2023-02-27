

import React,{useState,useRef,useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import clsx from 'clsx';
import { Class } from "@mui/icons-material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const linkStyle = {
    textDecoration : "none",
    boxShadow : "none",
    color : "white"

};


function Post(props) {
  const {title,text,userId,userName,postId,likes} = props;
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked,setIsLiked] = React.useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount,setLikeCount] = useState(likes.length);
  const [likeId,setLikeId] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
    
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1)
    }

  }

  
  const saveLike = () => {
    fetch("/likes",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        postId: postId,
        userId : userId,
        
      }),
    })
    .then((res) =>res.json())
    .catch((err) =>console.log("error"))
  }

  const deleteLike = () => {
    fetch("/likes/"+ likeId,{
      method: "DELETE",
      
    })
    
    .catch((err) =>console.log("error"))
  }

  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === userId));
    if(likeControl != null)
       setLikeId(likeControl.id);
       setIsLiked(true);
  }

  
  const refreshComments = () => {

    fetch("/comments?postId="+postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  
  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [commentList]);

  useEffect(() => {checkLikes()
   
  }, []);





   return(
    <div className="postContainer">
      <Card sx={{ maxWidth: 800,margin:20,direction:"row",justifyContent:"center",  alignItems:"center"}}>
                <CardHeader
                    avatar={
                      <Link to={{ pathname: "/users/" + userId }} style={linkStyle}>
                    <Avatar aria-label="recipe" >
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                 
                  <IconButton 
                  
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null}/>
                    
                    </IconButton> 
                    {likeCount}
                    <IconButton
                   expand={expanded}
                   onClick={handleExpandClick}
                   aria-expanded={expanded}
                   aria-label="show more"
                    >
                    <CommentIcon />
                    </IconButton>
                    
                    
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className="container">
          {error? "error" :
          isLoaded? commentList.map(comment => (
            <Comment userId={1} userName = {"user1"} text = {comment.text}/>
          )) : "Loading"}
          <CommentForm userId={1} userName = {"user1"} postId = {postId}></CommentForm>
        </Container>
      </Collapse>
    </Card>
    
                
               
                </div>
   )
}

export default Post;