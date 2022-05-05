import SubmitButton from './SubmitButton'
import InputField from './InputField'

const PersonForm = ({
  personAdder,
  nameToBeAdded,
  nameHandler,
  numberToBeAdded,
  numberHandler
}) => {
  return (
    <form onSubmit={personAdder}>
      <InputField inputName="name" inputValue={nameToBeAdded} inputHandler={nameHandler} />
      <InputField inputName="number" inputValue={numberToBeAdded} inputHandler={numberHandler} />
      <SubmitButton text="add" />
    </form>
  )
}

export default PersonForm
