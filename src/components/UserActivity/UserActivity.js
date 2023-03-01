import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Post from "../Post/Post";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
  const { isOpen, postId, setIsOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [post, setPost] = useState(null);

  const getPost = () => {
    fetch("/posts/" + postId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setPost(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return post != null ? (
    <div>
      <Button variant="outlined" onClick={handleClose}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Post
          likes={post.postLikes}
          postId={post.id}
          userId={post.userId}
          userName={post.userName}
          title={post.title}
          text={post.text}
        ></Post>
      </Dialog>
    </div>
  ) : (
    "loading"
  );
}

function UserActivity(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const { userId } = props;
  const [selectedPost, setSelectedPost] = useState(null);

  const handleNotification = (postId) => {

    setSelectedPost(postId);
    setIsOpen(true);

  };


  const getActivity = () => {
    fetch("/users/activity/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setRows(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>{isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/> : ""}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <Button onClick={() => handleNotification(row[1])}>
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row[3] + " " + row[0] + " your post"}
                </TableRow>
              </Button>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default UserActivity;
