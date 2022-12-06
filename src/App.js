import { useEffect, useState } from "react";
import './styles/App.css';
import "./styles/Post.css"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Post from './components/Post';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 5),
  },
}));

// TODO: these informations need to be in the tietokanta in these spesific names. If changed: change also in Post.js and Comments.js
const post = {
  username: "Kalle Tahna",
  avatar: "https://cdn.discordapp.com/attachments/1039070834481967185/1049287479905226792/8i4s4zpx7vh31.png",
  image: "https://cdn.discordapp.com/attachments/1039070834481967185/1049287479905226792/8i4s4zpx7vh31.png",
  text: "Kattokaa mun hemoo söpöö kissaa",
  comments: [
    {
      username: "Jonne Borgman",
      avatar: "/static/images/avatar/1.jpg",
      text: "Läski kissa"
    },
    {
      username: "Rasmus Hyyppä",
      avatar: "/static/images/avatar/1.jpg",
      text: "No on kyl"
    }
  ],
}
const post1 = {
  username: "Henri Uimonen",
  avatar: "https://cdn.discordapp.com/attachments/1039070834481967185/1049287479905226792/8i4s4zpx7vh31.png",
  image: "https://cdn.discordapp.com/attachments/1039070834481967185/1049287479905226792/8i4s4zpx7vh31.png",
  text: "Kattokaa mun hemoo söpöö kissaa",
  comments: [
    {
      username: "Jonne Borgman",
      avatar: "/static/images/avatar/1.jpg",
      text: "Läski kissa"
    },
    {
      username: "Rasmus Hyyppä",
      avatar: "/static/images/avatar/1.jpg",
      text: "No on kyl"
    }
  ],
}
//TODO: useeffect to fetch posts from tietokanta
function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([post, post1]);
  const [newPost, setNewPost] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [postText, setPostText] = useState("")

  const fileUploadHandler = (event) => {
    const file = URL.createObjectURL(event.target.files[0])
    setSelectedFile(file)
  }

  const addPost = (event) => {
    event.preventDefault();
    //TODO: newPost username: current logged in user, and users avatar
    //TODO: add post to tietokanta
    if (selectedFile !== null && postText !== "") {
      const newPost = {
        username: "Kissa Rakas",
        avatar: "https://cdn.discordapp.com/attachments/1039070834481967185/1049287479905226792/8i4s4zpx7vh31.png",
        image: selectedFile,
        text: postText,
        comments: [
        ],
      }
      setNewPost(false);
      setPosts([...posts, newPost]);
      setPostText("");
      setSelectedFile(null)
    }

  }
  if (post !== []) {
    return (
      <>
        <div className="app">
          <Modal
            open={newPost}
            onClose={() => setNewPost(false)}>
            <div style={modalStyle} className={classes.paper}>
              <center>
                <img
                  className="app__headerImgae"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                  height="30px"
                  alt="Logo" />
              </center>
              <form className="app_siginForm" onSubmit={addPost}>
                <Button variant="contained" color="secondary" component="label" className="app_formField">
                  Upload Kitty
                  <input hidden accept="image/*" multiple type="file" onChange={fileUploadHandler} />
                </Button>
                <TextField
                  label="Post Text"
                  variant="outlined"
                  size="small"
                  name="Post Text"
                  type="text"
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                  className="app_formField"
                />
                <Button type="submit" variant="contained" color="primary" >Post the kitty</Button>
              </form>
            </div>
          </Modal>

          <div className="app_header">
            <h1 className='app_name'>TigerGram</h1>
            <div>
              <Fab variant="extended" size="small" color="primary" className="app_signinBtn" onClick={() => /*setOpenSignin(true)*/ console.log("post")}>
                <LockOpenOutlinedIcon fontSize="small" /> SIGN IN
              </Fab>
              <Fab variant="extended" size="small" color="secondary" onClick={() => /*setOpen(true)*/ console.log("post")}>
                <PersonAddOutlinedIcon fontSize="small" /> SIGN UP
              </Fab>
            </div>
          </div>
          {posts.map((post, i) =>
            <Post key={i} post={post} setPosts={setPosts} />
          )}

        </div>
        <div className="add_post">
          <Fab color="primary" aria-label="add" onClick={() => setNewPost(true)}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
  else {
    return (
      <div className="app">
        <div className="app_header">
          <h1 className='app_name'>TigerGram</h1>
          <div>
            <Fab variant="extended" size="small" color="primary" className="app_signinBtn" onClick={() => /*setOpenSignin(true)*/ console.log("post")}>
              <LockOpenOutlinedIcon fontSize="small" /> SIGN IN
            </Fab>
            <Fab variant="extended" size="small" color="secondary" onClick={() => /*setOpen(true)*/ console.log("post")}>
              <PersonAddOutlinedIcon fontSize="small" /> SIGN UP
            </Fab>
          </div>
        </div>
        <div className='post'>
          <div className='post_header'>
            <ListItem>
              <ListItemText primary={"There is no posts! Be first to post a tiger!"} ></ListItemText>
            </ListItem>
          </div>
        </div>
        <div className="add_post">
          <Fab color="secondary" aria-label="add" onClick={addPost}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    )
  }
}

export default App;
