import Weather from './Weather'

const FocusCountry = ({ country }) => {
    const capital = country.capital[0] 
    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>
            capital {capital}<br />
            area {country.area}
          </p>
          <b>languages:</b>
          <ul>
          {(Object.values(country.languages)).map(language => 
            <li key={language}>
              {language}
            </li>
            )}
          </ul>
          <img src={country.flags.svg} alt='flag' width = '150' />
          <Weather capital={capital} />
        </div>
    ) 
}

export default FocusCountry