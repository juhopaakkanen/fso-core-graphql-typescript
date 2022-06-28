import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import BookForm from './components/BookForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  let timeoutID = null

  const notify = (message) => {
    clearTimeout(timeoutID)
    setErrorMessage(message)
    timeoutID = setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <Notification errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <Recommendations show={page === 'recommend'} />
      <BookForm show={page === 'add'} setError={notify} />
      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
