import axios from 'axios'
const baseUrl = 'https://tigerback.onrender.com/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }