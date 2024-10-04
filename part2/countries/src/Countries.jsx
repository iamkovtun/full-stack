
import CountryList from "./CountryList"
import CountrieCard from "./CountryCard"

const Countries = ({filtCountries, onClick}) => {
    console.log('done', filtCountries.length)
    if (filtCountries.length > 10) {
        return <div>To many matches, specify another filter</div>
    } else if (filtCountries.length > 1) {
        console.log('clist')
        return <CountryList filtCountries={filtCountries} onClick={onClick}/>

    } else if (filtCountries.length === 1) {
        return <CountrieCard country={filtCountries[0]}/>
    } else {
        return <div>No countries found</div>
    }
}

export default Countries