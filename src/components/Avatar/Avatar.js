import React,  {useState} from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {ListItem, List, ListItemSecondaryAction, Radio}  from "@mui/material";
import { PutWithAuth } from '../../services/HttpService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const modal = {
    display:"flex",
    maxWidth: 200,
  }



function Avatar(props) {

    const {avatarId,userId,userName} = props;
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);
   

    
    const saveAvatar = (path) => {
      PutWithAuth("/users/" + localStorage.getItem("currentUser"),{
        avatar: selectedValue,
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    };
  


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        saveAvatar();
       
      };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt="User Avatar" image={`/avatars/avatar${selectedValue}.png`} />
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User info
          </Typography>
        </CardContent>
        <CardActions>
          {localStorage.getItem("currentUser") == userId ? <Button onClick={handleOpen} size="small">Change Avatar</Button> : ""}
          
        </CardActions>
      </Card>
      <Modal style={modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <List dense>
      {[1, 2, 3, 4, 5, 6].map((key) => {
        const labelId = `checkbox-list-secondary-label-${key}`;
        return (
          <ListItem key={key} button>
              <CardMedia
              style = {{maxWidth: 100}}
              component="img"
              alt={`Avatar n°${key}`}
              image={`/avatars/avatar${key}.png`}
              title="User Avatar"
              />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                value= {key}
                onChange={handleChange}
                checked={""+selectedValue === ""+key}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    
        
      </Modal>
    
    </div>
  );
}

export default Avatar;
