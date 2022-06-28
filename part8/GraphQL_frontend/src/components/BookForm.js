import { useState } from 'react'
import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  ALL_GENRES,
  ALL_BOOKS_BY_GENRE
} from '../queries'
import { useMutation } from '@apollo/client'

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
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default BookForm
