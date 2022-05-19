import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('creating a new blog works as expected', async () => {
  const mockHandler = jest.fn()
  render(<BlogForm createBlog={mockHandler} />)

  const inputData = ['test title', 'test author', 'test url']
  const inputs = screen.getAllByRole('textbox')
  const user = userEvent.setup()

  await user.type(inputs[0], inputData[0])
  await user.type(inputs[1], inputData[1])
  await user.type(inputs[2], inputData[2])
  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(inputData[0])
  expect(mockHandler.mock.calls[0][0].author).toBe(inputData[1])
  expect(mockHandler.mock.calls[0][0].url).toBe(inputData[2])
})