import { useEffect, useState } from "react";
import './styles/App.css';
import "./styles/Post.css"
import React from 'react';
import Fab from '@material-ui/core/Fab';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Post from './components/Post';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@mui/icons-material/Add';
// TODO: these informations need to be in the tietokanta in these spesific names, because Post.js and Comments.js use these names.
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
  const [posts, setPosts] = useState([post, post1]);

  if (post !== []) {
    return (
      <>
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
          {posts.map((post, i) =>
            <Post key={i} post={post} setPosts={setPosts} />
          )}

        </div>
        <div className="add_post">
          <Fab color="primary" aria-label="add" onClick={() => console.log("clicked")}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
  else {
    console.log("ljdsfljkdsfjksd");
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
          <Fab color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
    )
  }
}

export default App;
