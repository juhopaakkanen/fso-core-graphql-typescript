import InputField from './InputField'

const Filter = ({ filterText, filterHandler }) => {
  return (
    <InputField
      inputName="filter shown with"
      inputValue={filterText}
      inputHandler={filterHandler}
    />
  )
}

export default Filter
