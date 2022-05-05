import Person from './Person'

const Persons = ({ personsFiltered, removePerson }) => { 
    return ( 
        personsFiltered.map(person => 
        <Person key={person.name} person={person} handleClick={() => removePerson(person.id)} />)
    )
}

export default Persons