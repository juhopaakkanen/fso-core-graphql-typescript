import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_BY_GENRE } from '../queries'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>title</b>
              </TableCell>
              <TableCell>
                <b>author</b>
              </TableCell>
              <TableCell>
                <b>published</b>
              </TableCell>
            </TableRow>
            {booksData?.allBooks.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      Filter by genre:
      {genres.map((g) => (
        <Button key={g} onClick={() => setGenre(g)}>
          {g}
        </Button>
      ))}
    </div>
  )
}

export default Books
