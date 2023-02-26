
import Post from "../Post/Post";
import React, { useEffect, useState } from "react";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/posts")
        .then(res => res.json())
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
    }, [])
    
    if(error) {

        return <div>Error !!!</div>
    } else if(!isLoaded){
        return <div>Loading .....</div>
    } else{
        return (
            <div className="container">
          Home!!
            {postList.map(post => (
                
                <Post key={post.id} title ={post.title} text={post.text} ></Post>
                
                //  <li key={post.id}>
                //      {post.title} {post.text}
                //  </li>
              
            ))}
        </div>
        )
        
    }

}

export default Home;