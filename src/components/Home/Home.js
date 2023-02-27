import Post from "../Post/Post";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PostForm from "../Post/PostForm";

const divstyle = {
  
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
   backgroundColor: "#f0f5ff",
 
};

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {

    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }



  useEffect(() => {
    refreshPosts()
  }, [postList]);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading .....</div>;
  } else {
    return (
      
        <div style={divstyle} >
          <PostForm  
              userId={1}
              userName={"sszsd"}
              refreshPosts = {refreshPosts}
               />
          {postList.map((post) => (
           
            <Post
              key={post.id}
              likes= {post.postLikes}
              userId={post.userId}
              postId ={post.id}
              userName={post.userName}
              title={post.title}
              text={post.text}
             
            ></Post>
            
          ))}
          
        </div>
      
    );
  }
}

export default Home;
