import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const signUp = async credentials => {
    console.log("credentasa", credentials);
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signUp }