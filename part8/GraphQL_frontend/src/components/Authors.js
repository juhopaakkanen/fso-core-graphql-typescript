import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BornForm from './BornForm'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>name</b>
              </TableCell>
              <TableCell>
                <b>born</b>
              </TableCell>
              <TableCell>
                <b>bookCount</b>
              </TableCell>
            </TableRow>
            {data.allAuthors.map((a) => (
              <TableRow key={a.name}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.born}</TableCell>
                <TableCell>{a.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {token ? <BornForm /> : null}
    </div>
  )
}

export default Authors
