import { useEffect, useState } from "react";
import './styles/App.css';
import "./styles/Post.css"
import services from "./services/posts";
import loginService from './services/login';
import signUpService from './services/signUp';
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

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [postText, setPostText] = useState("")

  const [signUp, setSignUp] = useState(false);
  const [isAvatar, setSignUpAvatar] = useState("");
  const [avatar, setAvatar] = useState("");
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    services.getAll().then((post) => {
      setPosts(post);
      console.log(post);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      services.setToken(user.token)
    }
  }, [])

  const handleSignUp = async (event) => {
    const avatar = isAvatar ? isAvatar : "https://picsum.photos/200/300";
    
    event.preventDefault()
    try {
      setAvatar(avatar)
      const user = await signUpService.signUp({
        username, password, avatar
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      services.setToken(user.token)

      setSignUp(false)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError({ error: `wrong username or password` })
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      services.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setLogin(false)
    } catch (exception) {
      setError({ error: `wrong username or password` })
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload(true);
  }

  const fileUploadHandler = (event) => {
    const file = URL.createObjectURL(event.target.files[0])
    setSelectedFile(file)
  }

  const addPost = (event) => {
    event.preventDefault();
    if (selectedFile !== null && postText !== "") {
      const newPost = {
        tigerUser: user.id,
        tigerAvatar: user.avatar,
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
  
  return (
    <>
      <div className="app">
        {/* //SignUp */}
        <Modal
          open={signUp}
          onClose={() => setSignUp(false)}>
          <div style={modalStyle} className={classes.paper}>
            <center>
              <img
                className="app__headerImgae"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                height="30px"
                alt="Logo" />
            </center>
            <form className="app_siginForm" onSubmit={handleSignUp}>
              <TextField
                label="Username"
                variant="outlined"
                size="small"
                name="Username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className="app_formField"
              />
              <TextField
                label="Avatar URL"
                variant="outlined"
                size="small"
                name="Avatar URL"
                type="text"
                value={isAvatar}
                onChange={({ target }) => setSignUpAvatar(target.value)}
                className="app_formField"
              />
              <TextField
                label="Password"
                variant="outlined"
                size="small"
                name="Password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="app_formField"
              />
              <Button type="submit" variant="contained" color="primary" >Sign Up!</Button>
            </form>
          </div>
        </Modal>
        {/* //Login */}
        <Modal
          open={login}
          onClose={() => setLogin(false)}>
          <div style={modalStyle} className={classes.paper}>
            <center>
              <img
                className="app__headerImgae"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                height="30px"
                alt="Logo" />
            </center>
            <form className="app_siginForm" onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                size="small"
                name="Username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className="app_formField"
              />
              <TextField
                label="Password"
                variant="outlined"
                size="small"
                name="Password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="app_formField"
              />
              <Button type="submit" variant="contained" color="primary" >Log in!</Button>
            </form>
          </div>
        </Modal>
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
        {/* //LOGIN */}
        <div className="app_header">
          <h1 className='app_name'>TigerGram</h1>
          <div>
            {user ?
              <>
                <Fab variant="extended" size="small" color="primary" className="app_signinBtn" onClick={handleLogout}>
                  <LockOpenOutlinedIcon fontSize="small" /> LOG OUT
                </Fab>
              </> :
              <>
                <Fab variant="extended" size="small" color="primary" className="app_signinBtn" onClick={() => setLogin(true)}>
                  <LockOpenOutlinedIcon fontSize="small" /> SIGN IN
                </Fab>
                <Fab variant="extended" size="small" color="secondary" onClick={() => setSignUp(true)}>
                  <PersonAddOutlinedIcon fontSize="small" /> SIGN UP
                </Fab>
              </>}
          </div>
        </div>
        {posts.length !== 0 ? posts.map((post, i) =>
          <Post key={i} post={post} posts={posts} setPosts={setPosts} getModalStyle={getModalStyle} useStyles={useStyles} user={user} />
        ) :
          <>
            <div className='post'>
              <div className='post_header'>
                <ListItem>
                  <ListItemText primary={"There is no posts! Be first to post a tiger!"} ></ListItemText>
                </ListItem>
              </div>
            </div>
          </>}

      </div>
      {user ?
        <>
          <div className="add_post">
            <Fab color="primary" aria-label="add" onClick={() => setNewPost(true)}>
              <AddIcon />
            </Fab>
          </div>
        </> : <></>}
    </>
  );
}

export default App;
