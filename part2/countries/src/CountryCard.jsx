import Weather from "./Weather"

const CountrieCard = ({country}) => {
    console.log(`countrycard ${country}`)
    return (
        <div>
            <h1>{country.name.official}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <br/>
            <strong>languages:</strong>
            <ul>
            {Object.values(country.languages).map(language => (
                 <li key={language}>{language}</li>
            ))}
            </ul>
            <img 
            src={country.flags.png}
            width="auto" 
            height="100"
            />
            <Weather capital={country.capital} latlng={country.capitalInfo.latlng}/>

        </div>
    )
}

export default CountrieCard