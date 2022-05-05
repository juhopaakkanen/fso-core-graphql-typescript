import ClickButton from './ClickButton' 

const Person = ({ person, handleClick }) => {
    return (
      <li>
        {person.name} {person.number}
        <ClickButton handleClick={handleClick} text='delete' />
      </li>
    )
} 

export default Person