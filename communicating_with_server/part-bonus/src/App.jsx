import { useState, useEffect } from 'react'
import countryService from './services/countries'


function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (newFilter) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
      )
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries([])
    }
  }, [newFilter, countries])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      find countries: <input 
        value={newFilter}
        onChange={handleFilterChange}
      />

      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
            </div>
          ))}
        </div>
      )}

      {filteredCountries.length === 1 && (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img 
            src={filteredCountries[0].flags.png} 
            alt={filteredCountries[0].flags.alt}
            width="150"
          />
        </div>
      )}
    </div>
  )
}

export default App
