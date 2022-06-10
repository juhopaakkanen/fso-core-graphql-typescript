import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog correctly default', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }
  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent(`${blog.title}`)
  expect(container).toHaveTextContent(`${blog.author}`)
  expect(container).not.toHaveTextContent(`${blog.url}`)
  expect(container).not.toHaveTextContent(`${blog.likes}`)
})

test('renders blog correctly view clicked', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '627d3c5e921efb3d814bdfe0'
  }
  const mockUser = { username: 'johndoe' }
  const { container } = render(<Blog blog={blog} user={mockUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(container).toHaveTextContent(`${blog.url}`)
  expect(container).toHaveTextContent(`${blog.likes}`)
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '627d3c5e921efb3d814bdfe0'
  }
  const mockUser = { username: 'johndoe' }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLikes={mockHandler} user={mockUser} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('likes')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
