const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((a, { likes }) => a + likes, 0)

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((a, b) => a.likes > b.likes ? a : b)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const authors = _.map(blogs, 'author')
    const mostBlogs = _(authors).countBy().toPairs().maxBy(_.last)
    return { author: mostBlogs[0], blogs: mostBlogs[1] }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const likesAndAuthors = _.zip(_.map(blogs, 'author'), _.map(blogs, 'likes'))
    const summedLikesGroupedByAuthor = likesAndAuthors.reduce((result, item) => {
      result[item[0]] = (result[item[0]] ||  0) + Number(item[1])
      return result
    }, [])
    const mostLikes = Object.entries(summedLikesGroupedByAuthor).reduce((a, b) => a[1] > b[1] ? a : b)
    return { author: mostLikes[0], likes: mostLikes[1] }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}