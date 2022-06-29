import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import BookForm from './components/BookForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import { useSubscription, useApolloClient } from '@apollo/client'
import { updateCache } from './utils/updateCache'
import { AppBar, Toolbar, Button } from '@mui/material'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  let timeoutID = null

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user-token')
    if (loggedUser) {
      setToken(loggedUser)
    }
  }, [])

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => setPage('authors')}>
              authors
            </Button>
            <Button color="inherit" onClick={() => setPage('books')}>
              books
            </Button>
            {token ? (
              <>
                <Button color="inherit" onClick={() => setPage('add')}>
                  add book
                </Button>
                <Button color="inherit" onClick={() => setPage('recommend')}>
                  recommend
                </Button>
                <Button color="inherit" onClick={logout}>
                  logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => setPage('login')}>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Notification errorMessage={errorMessage} />
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
