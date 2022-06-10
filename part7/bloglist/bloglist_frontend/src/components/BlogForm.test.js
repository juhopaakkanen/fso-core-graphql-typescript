import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('creating a new blog works as expected', async () => {
  const mockHandler = jest.fn()
  const { container } = render(<BlogForm createBlog={mockHandler} />)

  const inputs = ['test title', 'test author', 'test url']
  const user = userEvent.setup()

  await user.type(container.querySelector('#title-input'), inputs[0])
  await user.type(container.querySelector('#author-input'), inputs[1])
  await user.type(container.querySelector('#url-input'), inputs[2])
  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(inputs[0])
  expect(mockHandler.mock.calls[0][0].author).toBe(inputs[1])
  expect(mockHandler.mock.calls[0][0].url).toBe(inputs[2])
})
