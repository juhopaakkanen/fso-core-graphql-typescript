import Button from './Button' 

const Country = ({ country, handleClick }) => {
  return (
    <div>
    {country.name.common}
    <Button handleClick={handleClick} text='show' />
  </div>
  )
}
  
export default Country