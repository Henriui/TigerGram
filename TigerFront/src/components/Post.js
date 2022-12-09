import React from 'react'
import { useEffect, useState } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button } from "@material-ui/core";
import "../styles/Post.css"
import Comments from './Comments';
import SendIcon from '@material-ui/icons/Send'
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
// import HoverRating from './HoverRating';

function Post({ post }) {
    const [comment, setComment] = useState("");
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleNameChange = (event) => {
        setComment(event.target.value);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

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
                    <div className='settings_button'>
                        <Button
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        ><SettingsIcon />
                        </Button>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem onClick={(event) => { handleClose(event); console.log("I need to edit text");}}><EditIcon />Edit Text</MenuItem>
                                                <Divider sx={{ my: 0.5 }} />
                                                <MenuItem onClick={(event) => { handleClose(event); console.log("I need to delete text"); }}><DeleteIcon />Delete</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
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