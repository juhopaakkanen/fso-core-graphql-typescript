import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BORN } from '../queries'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'

const BornForm = () => {
  const names = useQuery(ALL_AUTHORS).data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }))

  if (!names) {
    return null
  }

  const [name, setName] = useState(names[0])
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    changeBorn({ variables: { name: name.value, setBornTo: parseInt(born) } })
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={setName} options={names} />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BornForm
