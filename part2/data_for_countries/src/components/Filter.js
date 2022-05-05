import InputField from './InputField'

const Filter = ({ filterText, filterHandler }) => {
    return (
        <InputField inputName='find countries' inputValue={filterText} inputHandler={filterHandler} />
    )
}

export default Filter