import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BornForm from './BornForm'

const Authors = ({ show, token }) => {
  if (!show) {
    return null
  }

  const { data, loading } = useQuery(ALL_AUTHORS)

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? <BornForm /> : null}
    </div>
  )
}

export default Authors
