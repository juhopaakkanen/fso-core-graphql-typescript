import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_BY_GENRE } from '../queries'

const Books = ({ show }) => {
  if (!show) {
    return null
  }

  const [genre, setGenre] = useState('all genres')
  const { data: allBooksData, loading } = useQuery(ALL_BOOKS)
  const { data: genreData } = useQuery(ALL_GENRES)

  const { data: booksByGenreData } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: genre },
    skip: genre === 'all genres'
  })

  if (loading) {
    return <div>loading...</div>
  }

  let genres = genreData?.allGenres
  genres = genres.concat('all genres')

  const booksData = genre === 'all genres' ? allBooksData : booksByGenreData

  return (
    <div>
      <h2>books</h2>
      {genre !== 'all genres' ? (
        <p>
          in genre <b>{genre}</b>
        </p>
      ) : (
        <p>listing all books</p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
