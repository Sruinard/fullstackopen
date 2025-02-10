
import axios from 'axios'
import { useState, useEffect } from 'react'

const useResource = (baseUrl) => {
    const [authToken, setAuthToken] = useState(null)
    const [resources, setResources] = useState([])

    const setToken = newToken => {
        setAuthToken(`bearer ${newToken}`)
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        return response.data
    }
  
    const create = async (resource) => {
        const config = {
            headers: { Authorization: authToken },
        }
        const response = await axios.post(baseUrl, resource, config)
        setResources(resources.concat(response.data))
    }

    useEffect(() => {
        const fetchResources = async () => {
            const resources = await getAll()
            setResources(resources)
        }
        fetchResources()
    }, [getAll])
  
    const service = {
      create,
      getAll,
      setToken
    }
  
    return [
      resources, service
    ]
  }


export default useResource

