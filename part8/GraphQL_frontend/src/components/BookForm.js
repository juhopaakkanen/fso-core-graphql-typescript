import { useState } from 'react'
import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  ALL_GENRES,
  ALL_BOOKS_BY_GENRE
} from '../queries'
import { useMutation } from '@apollo/client'
import { Button, TextField } from '@mui/material'

const BookForm = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const refetchQueries = [
    { query: ALL_BOOKS },
    { query: ALL_AUTHORS },
    { query: ALL_GENRES }
  ]
  genres.forEach((genre) =>
    refetchQueries.push({
      query: ALL_BOOKS_BY_GENRE,
      variables: { genre: genre }
    })
  )

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: refetchQueries,
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: parseInt(published), genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add a book:</h2>
      <form onSubmit={submit}>
        <div>
          <TextField
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="published"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <TextField
            label="genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type="button">
            add genre
          </Button>
        </div>
        <p>genres: {genres.join(', ')}</p>
        <br />
        <Button variant="contained" color="primary" type="submit">
          create book
        </Button>
      </form>
    </div>
  )
}

export default BookForm
