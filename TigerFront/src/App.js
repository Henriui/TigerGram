import { useEffect, useState } from "react";
import './styles/App.css';
import "./styles/Post.css"
import services from "./services/posts";
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

//TODO: useeffect to fetch posts from tietokanta
function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [postText, setPostText] = useState("")

  useEffect(() => {
    services.getAll().then((post) => {
      setPosts(post);
    });
  }, []);

  const fileUploadHandler = (event) => {
    console.log("file = ", event.target.files[0].name);
    const file = URL.createObjectURL(event.target.files[0].name)
    setSelectedFile(file)
  }

  const addPost = (event) => {
    event.preventDefault();
    //TODO: newPost username: current logged in user, and users avatar
    //TODO: add post to tietokanta
    if (selectedFile !== null && postText !== "") {
      const newPost = {
        tigerUser: "639347fac73cce0d7a430149",
        tigerAvatar: "https://cdn.discordapp.com/attachments/1039070834481967185/1050725118285971546/0f5cddcf96d10930a84f58f5cada7e2d.jpg",
        image: selectedFile,
        text: postText,
        comments: [
        ],
      }
      services
        .create(newPost)
        .then((post) => {
          setPosts(posts.concat(post));
          setPostText("");
        })
      window.location.reload(true);
      setNewPost(false);
      setSelectedFile(null)
    }

  }
  if (posts.length !== 0) {
    return (
      <>
        <div className="app">
          {/* TODO: if user is not logged in. then the add button should be hidden (the MODAL part)*/}
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
            <Post key={i} post={post} posts={posts} setPosts={setPosts} getModalStyle={getModalStyle} useStyles={useStyles} />
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
