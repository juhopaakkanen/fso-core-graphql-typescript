import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'
import { FAVORITE_GENRE } from '../queries'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

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
            {data?.allBooks.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Recommendations
