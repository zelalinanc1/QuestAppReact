

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
import { PostWithAuth } from "../../services/HttpService";
import { DeleteWithAuth } from "../../services/HttpService";
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
  const [refresh, setRefresh] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true:false;
  
  const setCommentRefresh = () => {

    setRefresh(true);
  }


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
    PostWithAuth("/likes",{
      postId: postId,
      userId : localStorage.getItem("currentUser"),
      
    })
    .then((res) =>res.json())
    .catch((err) =>console.log("error"))
  }

  const deleteLike = () => {
    DeleteWithAuth("/likes/"+ likeId)
    .catch((err) =>console.log("error"))
  }

  const checkLikes = () => {
    var likeControl = likes.find((like =>  ""+like.userId === localStorage.getItem("currentUser")));
    if(likeControl != null)
       setLikeId(likeControl.id);
       setIsLiked(true);
  }

  
  const refreshComments = () => {

    fetch("/api/comments?postId="+postId)
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

      setRefresh(false);
  };

  
  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [refresh]);

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
                  {disabled ?                    
                  <IconButton 
                    disabled
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton> :
                    <IconButton 
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FavoriteIcon style={isLiked? { color: "red" } : null} />
                    </IconButton>
                  }
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
            <Comment userId={comment.userId} userName = {comment.userName} text = {comment.text}/>
          )) : "Loading"}
             {disabled? "" : 
          <CommentForm userId={localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} postId = {postId} setCommentRefresh={setCommentRefresh}></CommentForm>}
        </Container>
      </Collapse>
    </Card>
    
                
               
                </div>
   )
}

export default Post;