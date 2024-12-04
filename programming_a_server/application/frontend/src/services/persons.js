import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`)
  return getAll()
}

// Use put method to partially update a ressource
const update = (id, newObject) => {
  // construct the unique url of the single note to be changed
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  deletePerson
}
