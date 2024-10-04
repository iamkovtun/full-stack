
const CountryList = ({filtCountries, onClick}) => {
   console.log(filtCountries)
   filtCountries.map(country => {
    console.log(country.name.official)})
   return (
    <div>
        {filtCountries.map(country => (
            <div key={country.name.official}>
                {country.name.official}
                <button onClick={onClick} value={country.name.official}>show</button>
            </div>

        ))}
    </div>
   )
}

export default CountryList