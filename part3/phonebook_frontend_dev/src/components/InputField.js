const InputField = ({ inputName, inputValue, inputHandler }) => {
  return (
    <div>
      {inputName}: <input value={inputValue} onChange={inputHandler} />
    </div>
  )
}

export default InputField
