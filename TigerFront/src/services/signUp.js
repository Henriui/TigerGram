import axios from 'axios'
const baseUrl = 'https://tigerback.onrender.com/users'

const signUp = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signUp }