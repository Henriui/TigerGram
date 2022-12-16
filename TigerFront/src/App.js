import React from 'react';
import { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/Post.css';
import Modal from '@material-ui/core/Modal';
import postServices from './services/posts';
import loginService from './services/login';
import signUpService from './services/signUp';
import { makeStyles } from '@material-ui/core/styles';
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
};

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

const Notification = ({ message, className }) => {
	if (message === undefined) {
		return '';
	}
	return <div className={className}>{message}</div>;
};

function App() {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [postText, setPostText] = useState('');

	const [signUp, setSignUp] = useState(false);
	const [isAvatar, setSignUpAvatar] = useState('');
	const [avatar, setAvatar] = useState('');
	const [login, setLogin] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [errorMessage, setError] = useState('');

	useEffect(() => {
		const fetchPosts = async () => {
			const allPosts = await postServices.getAll();
			setPosts(allPosts);
			console.log('posts', allPosts);
		};
		try {
			fetchPosts();
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedTigerUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			postServices.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem(
				'loggedTigerUser',
				JSON.stringify(user),
			);
			postServices.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
			setLogin(false);
		} catch (exception) {
			setError(exception.response.data.error);
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedTigerUser');
		window.location.reload(true);
	};

	const imageHandler = (imageUrl) => {
		const url = new URL(imageUrl);
		const path = url.pathname.split('/');
		const fileName = path[path.length - 1];
		let fileExtension = fileName.split('.')[1];
		console.log('fileExtension', fileExtension);
		if (fileExtension === undefined) {
			fileExtension = '.jpg';
		}

		const image = 'https://i.imgur.com/' + fileName + 'l' + fileExtension;
		return image;
	};

	const handleSignUp = async (event) => {
		event.preventDefault();

		try {
			setAvatar(imageHandler(isAvatar));
			console.log('avatar', avatar);

			const user = await signUpService.signUp({
				username,
				password,
				avatar: imageHandler(isAvatar),
			});

			window.localStorage.setItem(
				'loggedTigerUser',
				JSON.stringify(user),
			);
			postServices.setToken(user.token);

			setSignUp(false);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setError(exception.response.data.error);
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	};

	const addPost = (event) => {
		event.preventDefault();
		if (imageUrl !== null && postText !== '') {
			const newPost = {
				tigerUser: [
					{
						username: user.username,
						avatar: user.avatar,
						id: user.id,
					},
				],
				image: imageHandler(imageUrl),
				text: postText,
				comments: [],
			};
			postServices.create(newPost).then((post) => {
				setPosts(posts.concat(post));
				setPostText('');
			});
			//window.location.reload(true);
			setNewPost(false);
			setSelectedFile(null);
			setImageUrl(null);
		} else {
			setError({ error: `You need a url and post text` });
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	};

	return (
		<>
			<div className='app'>
				{/* //SignUp */}
				<Modal open={signUp} onClose={() => setSignUp(false)}>
					<div style={modalStyle} className={classes.paper}>
						<Notification
							message={
								errorMessage?.notification ||
								errorMessage?.error
							}
							className={
								errorMessage?.notification
									? 'notification'
									: 'error'
							}
						/>
						<center>
              <h1 className='app_name'>TigerGram</h1>
						</center>
						<form className='app_siginForm' onSubmit={handleSignUp}>
							<TextField
								label='Username'
								variant='outlined'
								size='small'
								name='Username'
								type='text'
								value={username}
								onChange={({ target }) =>
									setUsername(target.value)
								}
								className='app_formField'
							/>
							<TextField
								className='app_formField'
								label='https://i.imgur.com/'
								name='Avatar'
								type='text'
								value={isAvatar}
								variant='outlined'
								onChange={({ target }) =>
									setSignUpAvatar(target.value)
								}
							/>
							<TextField
								label='Password'
								variant='outlined'
								size='small'
								name='Password'
								type='password'
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
								className='app_formField'
							/>
							<Button
								type='submit'
								variant='contained'
								color='primary'>
								Sign Up!
							</Button>
						</form>
					</div>
				</Modal>
				{/* //Login */}
				<Modal open={login} onClose={() => setLogin(false)}>
					<div style={modalStyle} className={classes.paper}>
						<Notification
							message={
								errorMessage?.notification ||
								errorMessage?.error
							}
							className={
								errorMessage?.notification
									? 'notification'
									: 'error'
							}
						/>
						<center>
              <h1 className='app_name'>TigerGram</h1>
						</center>
						<form className='app_siginForm' onSubmit={handleLogin}>
							<TextField
								label='Username'
								variant='outlined'
								size='small'
								name='Username'
								type='text'
								value={username}
								onChange={({ target }) =>
									setUsername(target.value)
								}
								className='app_formField'
							/>
							<TextField
								label='Password'
								variant='outlined'
								size='small'
								name='Password'
								type='password'
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
								className='app_formField'
							/>
							<Button
								type='submit'
								variant='contained'
								color='primary'>
								Log in!
							</Button>
						</form>
					</div>
				</Modal>
				<Modal open={newPost} onClose={() => setNewPost(false)}>
					<div style={modalStyle} className={classes.paper}>
						<Notification
							message={
								errorMessage?.notification ||
								errorMessage?.error
							}
							className={
								errorMessage?.notification
									? 'notification'
									: 'error'
							}
						/>
						<center>
              <h1 className='app_name'>TigerGram</h1>
						</center>
						<form className='app_siginForm' onSubmit={addPost}>
							<TextField
								label='Give Kitty Url'
								variant='outlined'
								size='small'
								name='Give Kitty Url'
								type='text'
								value={imageUrl}
								onChange={({ target }) =>
									setImageUrl(target.value)
								}
								className='app_formField'
							/>
							<TextField
								label='Post Text'
								variant='outlined'
								size='small'
								name='Post Text'
								type='text'
								value={postText}
								onChange={(e) => setPostText(e.target.value)}
								className='app_formField'
							/>
							<Button
								type='submit'
								variant='contained'
								color='primary'>
								Post the kitty
							</Button>
						</form>
					</div>
				</Modal>
				{/* //LOGIN */}
				<div className='app_header'>
					<h1 className='app_name'>TigerGram</h1>
					<div>
						{user ? (
							<>
								<Fab
									variant='extended'
									size='small'
									color='primary'
									className='app_signinBtn'
									onClick={handleLogout}>
									<LockOpenOutlinedIcon fontSize='small' />{' '}
									LOG OUT
								</Fab>
							</>
						) : (
							<>
								<Fab
									variant='extended'
									size='small'
									color='primary'
									className='app_signinBtn'
									onClick={() => setLogin(true)}>
									<LockOpenOutlinedIcon fontSize='small' />{' '}
									SIGN IN
								</Fab>
								<Fab
									variant='extended'
									size='small'
									color='secondary'
									onClick={() => setSignUp(true)}>
									<PersonAddOutlinedIcon fontSize='small' />{' '}
									SIGN UP
								</Fab>
							</>
						)}
					</div>
				</div>
				{posts.length !== 0 ? (
					posts.map((post, i) => (
						<Post
							key={i}
							post={post}
							posts={posts}
							setPosts={setPosts}
							getModalStyle={getModalStyle}
							useStyles={useStyles}
							user={user}
							setLogin={setLogin}
						/>
					))
				) : (
					<>
						<div className='post'>
							<div className='post_header'>
								<ListItem>
									<ListItemText
										primary={
											'There is no posts! Be first to post a tiger!'
										}></ListItemText>
								</ListItem>
							</div>
						</div>
					</>
				)}
			</div>
			{user ? (
				<>
					<div className='add_post'>
						<Fab
							color='primary'
							aria-label='add'
							onClick={() => setNewPost(true)}>
							<AddIcon />
						</Fab>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default App;
