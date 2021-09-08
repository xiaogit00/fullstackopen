import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Ex 2.12: Filter and display countries from API

//High level logics:
// I first need to load the data into a countries variable
// Then, let me try to display the country names
// Then, my input would need to filter the data.
//    -To create my filter,
// Finally, I'll need to check for the condition when countries.length===1

// Ex 2.13: I'll need to show those buttons, so that when I click on it, it could take me to that view that I need to show.
// Right now, the view is triggered when displayedCountries ===1
// I would need to trigger it upon click now, and I need additional buttons

  // Ex 2.13 Pseudo-code
  // 1.First, return the app to the state where it shows a list of countries [DONE]
  //    - i.e. But change the condition.
  // 2. Add buttons to the side of each country display
  // 3. Button, onClick, selects the row, and then displays the content
  //    How do I achieve that? I first need an event handler for sure
  //  eventHandler: sets countries to the one selected, ok liao the
  // rest is easy. Sets selected state variable to True as well.

//Ex2.14:Pseudo-code
// I'll need to first make a call to the API, and get the data and save in variable
// Do I need to create a new state though? perhaps I should, so that page would
// Refresh when it's done loading.
const Weather = ({country}) => {
  const weatherUrl = "http://api.weatherstack.com/current?access_key=" + process.env.REACT_APP_API_KEY + "&query=" + country
  const [weather, setWeather] = useState([])
  const hook = () => {
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(hook, [])
  // console.log(weather)
  return (
    <>
    <p><b>Temperature: </b>{weather.current.temperature} </p>
    <img src={weather.current.weather_icons[0]} width="100" height="100" />
    <p><b>Wind: </b>{weather.current.wind_speed} mph direction: {weather.current.wind_dir} </p>
    </>
  )

}

const Countries = ({ countries, search }) => {

  // const displayedCountries =  ? "Type Something!":
  //                            {selectedCountries}.length > 10 ? "Too many matches, specify another filter":
  //                            {selectedCountries}.length === 0 ? "Sorry, none match":
  //                            {selectedCountries};
  //                   console.log('displayed countries', displayedCountries)
  //I need to debug. I pass two state variables into Countries. Basically, Countries
  // I'll need to clearly outline the logic for countries.
  // 1. If search is empty, show string
  // 2. if search is non-empty, then show whichever countries found by search
  // 3. However: for countries.length > 10, if there are too many searches, then show string.
  // 4. For countries.length === 0, show string
  // 5. For countries.length === 1, return a special set of info

  //Filter for Countries
  // const countryToShow = {search} === ''
  //   ? null
  //   : countries.filter(x => x.name.toLowerCase().includes(search))
  const countryToShow = countries.filter(x => x.name.toLowerCase().includes(search))
  //Displaying the right countries: if nothing in array, return string; else, show all
  const [selectedCountry, setSelectedCountry] = useState([])

  const displayedCountries = countryToShow.length > 10 ? "Too many matches, specify another filter":
                             countryToShow.length === 0 ? "Sorry, none match":
                             countryToShow.map(x => <li key={x.name}>{x.name} <button onClick={() => {
                               setSelectedCountry([x])
                             }}>show</button></li>);


  if (search === '') {
    return (
      <><p>Type Something!</p></>
    )
  } else {

    if (selectedCountry.length === 1) {

      return (
        <>
          <h1>{selectedCountry[0].name}</h1>
          <br>
          </br>
          <p>capital: {selectedCountry[0].capital} </p>
          <p>population: {selectedCountry[0].population}</p>
          <h2>languages</h2>
          {selectedCountry[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          <br/>
          <img src={selectedCountry[0].flag} width="150" height="100" />
          <h2>Weather in {selectedCountry[0].name}</h2>
          <Weather country={selectedCountry[0].name} />
        </>
      )
    } else {
      return (
        <>
          {displayedCountries}
        </>
      )
    }
  }



}

const App = () => {

  const [countries, setCountries] = useState([])
  const [ search, setSearch] = useState('')


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])


  //Event Handler
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }



  return (
    <>
    <p>find countries
      <input value={search} onChange={handleSearch}></input>
    </p>
    <Countries countries={countries} search={search} />

    </>
  )
}


export default App
