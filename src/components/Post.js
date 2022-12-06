import React from 'react'
import { useEffect, useState } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button } from "@material-ui/core";
import "../styles/Post.css"
import Comments from './Comments';
import SendIcon from '@material-ui/icons/Send'
import DeleteIcon from '@mui/icons-material/Delete';
// import HoverRating from './HoverRating';

function Post({ post }) {
    const [comment, setComment] = useState("");

    const handleNameChange = (event) => {
        setComment(event.target.value);
    };

    // TODO: username and avatar needs to be fetch from the current user that has been logged in
    // FIXME: when submitting comment, the text field does not empty out.
    const addComment = (event) => {
        event.preventDefault();
        if (comment !== "") {
            const comments = [...post.comments, { username: "Testi Kommentoija", avatar: "/static/images/avatar/2.jpg", text: comment }]
            const newPostComment = { ...post, comments }
            setComment("");
            Object.assign(post, newPostComment)
        } 
    }
    return (
        <div className='post'>
            <div className='post_header'>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className="post_avatar" src={post.avatar} alt="avatar"></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={post.username} secondary="Abdi Danhi, UEA"></ListItemText>
                    <Button className='delete_button' variant="outlined" startIcon={<DeleteIcon />} onClick={() => console.log("pls delete me :(")}>
                        <p className='delete_text'>Delete</p>
                    </Button>
                </ListItem>
                <img className='post_image' src={post.image} alt='Post pic' />
                <h4 className='post_text'><strong>{post.username}: </strong>{post.text} </h4>
                {/* <div className='add_rating'>
                    <HoverRating />
                </div> */}
                <div className='post_comment'>
                    {post.comments.map((comment, i) =>
                        <Comments key={i} comment={comment} />
                    )}
                </div>
                <form className='post_form' onSubmit={addComment}>
                    <TextField label="add comment" size='small' variant='outlined' className='post_input' placeholder='add comment' onChange={handleNameChange} />
                    <Button variant='contained' size='small' endIcon={<SendIcon />} type='submit'>Send</Button>
                </form>
            </div>
        </div>
    )
}

export default Post