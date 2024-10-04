//Filter(filter, handleOnChangeFilter)
//Countries(filtredCountries, handleOnClickCountrie)
//--CountrieList(filtredCountries, handleOnClickCountrie)
//--CountrieCard(countrie)
//----Weather(lat,lon)

//API-countries
//getAll()

//API-weather
//getbyId()

//filter
//countries

//const = filtredCountries

//handleOnChangeFilter
//handleOnClickCountrie

import { useState, useEffect } from "react";
import serviceCountries from './services/countries'
import Countries from "./Countries";
import Filter from "./Filter";

const App = () => {
    const [filt, setFilt] = useState('Austria');
    const [countries, setCountries] = useState(null)

    useEffect(() => {
      console.log('countries pending')
      serviceCountries.getAll().then(
        initCountries => {
          setCountries(initCountries)
          console.log('countries loaded')
          console.log(initCountries.length)
        }
      )
    }, [])

    if (!countries) {
      console.log('first render')
      return null
    }
    console.log('second render')
    console.log(countries.length)
    
    const filtCountries = countries.filter(country =>
      country.name.official.toLowerCase().includes(filt.toLowerCase())
    );
    
    const handleOnClickCountrie = (event) => {setFilt(event.target.value)}
    const handleOnChangeFilter = (event) => {setFilt(event.target.value)}

    

    return (
      <div>
        <Filter filt={filt} onChange={handleOnChangeFilter}/>
        <Countries filtCountries={filtCountries} onClick={handleOnClickCountrie}/>
      </div>
    )
}

export default App




