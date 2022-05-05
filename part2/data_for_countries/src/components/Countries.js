import Country from './Country'
import FocusCountry from './FocusCountry'

const Countries= ({ countriesFiltered, setFocusCountry }) => {
    const len = countriesFiltered.length
    if (len > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (len === 1) {
        return (
            <FocusCountry country={countriesFiltered[0]} />
        ) 
    } else {
        return (
            countriesFiltered.map(country => 
                <Country key={country.name.common} country={country} handleClick={() => setFocusCountry(country.name.common)}  />)
        )
    }
}
    
export default Countries