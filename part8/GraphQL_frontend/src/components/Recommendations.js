import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'
import { FAVORITE_GENRE } from '../queries'

const Recommendations = ({ show }) => {
  if (!show) {
    return null
  }
  const { data: { me: { favoriteGenre } = {} } = {} } = useQuery(FAVORITE_GENRE)
  const { data } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: favoriteGenre === undefined
  })

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
