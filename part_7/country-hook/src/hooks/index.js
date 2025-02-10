import {useEffect, useState} from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
        const fetchCountry = async () => {
            if (name) {
                try {
                    const response = await axios.get(`${baseUrl}${name}`)
                    setCountry({data: {
                        name: response.data.name.common,
                        capital: response.data.capital[0],
                        population: response.data.population,
                        flag: response.data.flags.png
                    }, found: true})
                } catch (error) {
                    setCountry({data: null, found: false})
                }
            }
        }
        fetchCountry()
    }, [name])
    return country
}

export default useCountry