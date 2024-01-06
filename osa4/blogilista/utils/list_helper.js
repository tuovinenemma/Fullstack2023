const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)

}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.sort(function(a, b) {return b.likes-a.likes})
    return {
        title: maxLikes[0].title,
        author: maxLikes[0].author,
        likes: maxLikes[0].likes
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }


