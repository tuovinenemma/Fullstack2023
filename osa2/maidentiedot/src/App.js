import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = (props) => {
  if (props.only)
    return(
      <div>
      <SingleCountry country = {props.country} />
    </div>
    )
  else
    return (
      <div>
        {props.country.name.common}
        <button onClick={() => props.handleSelected(props.country)}>show</button>
      </div>
    )
}

const FilterCountries  = (props) => {
  return (
    <form>
        find countries <input 
            value={props.value}
            onChange={props.eventHandler}
            />
    </form>
  )
}

const SingleCountry = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  return(
    <div>
      <h1> {country.name.common} </h1>
      <p> capital {country.capital} </p>
      <p> area {country.area} </p>
      <h3> languages: </h3>
      <ul>
        {Object.keys(country.languages).map((language, index) => (
          <li key={index}>{country.languages[language]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} style={{ maxWidth: '140px' }} />
      <p> Temperature {weather?.main.temp ?? ''} Celsius </p>
      {weather?.weather ? <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img> : <p>loading...</p>}
      <p> Wind {weather?.wind.speed ?? ''} m/s </p>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState("")
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    console.log('fetching country data')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const ShowCountries = ({value}) => {
    const included = countries.filter(
      country => country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    console.log('included', included)
    if (included.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else if (included.length === 1) {
      return (
        <div>
          {included.map (country =>
            < CountryList country = {country} only={true} />)}
        </div>
      )
    } else if (selected) {
      return (
        <div>
          <SingleCountry country = {selected} />
        </div>
      )
  } else {
      return (
        <div>
          {included.map (country =>
            < CountryList key = {country.name.common} country = {country} handleSelected = {handleSelected}/>)}
        </div>
      )}
  }

  const handleSelected = (country) => {
    console.log(country)
    setSelected(country)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  return (
    <div>
      < FilterCountries value = {value} eventHandler = {handleChange} />
      < ShowCountries value={value} />
    </div>
  )
}

export default App