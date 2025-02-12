import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    const blogs = response.data
    // sort and create new array
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    throw error
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('response', response)
  return response.data
}

const update = async (newObject) => {
  console.log('token', token)
  const config = {
    headers: { Authorization: token },
  }
  console.log('newObject', newObject)
  const response = await axios.put(`${ baseUrl }/${newObject.id}`, newObject, config)
  console.log('response', response)
  return response.data
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  console.log('response', response)
  return response.data
}

export default { getAll, create, update, deleteBlog, setToken }