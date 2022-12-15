import axios from 'axios';
const baseUrl = '/posts';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = async (id, newObject) => {
	const request = await axios.put(`${baseUrl}/${id}`, newObject);
	return request.data;
};
const deleteData = async (id) => {
	const request = await axios.delete(`${baseUrl}/${id}`);
	return request.data;
};
const getData = { getAll, create, update, deleteData, setToken };

export default getData;
