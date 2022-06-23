import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  let timeoutID = null

  const notify = (message) => {
    clearTimeout(timeoutID)
    setErrorMessage(message)
    timeoutID = setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <Notification errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <BookForm show={page === 'add'} setError={notify} />
    </div>
  )
}

export default App
