import axios from 'axios'
const baseUrl = '/api/login'

const login = async loginObject => {
  const response = await axios.post(baseUrl, loginObject)
  return response.data
}

export default { login }