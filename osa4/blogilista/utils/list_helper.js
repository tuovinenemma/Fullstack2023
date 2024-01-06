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

const mostBlogs = (blogs) => {
    const blogCounts = {};
  
    blogs.forEach(blog => {
      if (!blogCounts[blog.author]) {
        blogCounts[blog.author] = 0;
      }
      blogCounts[blog.author]++;
    });
  
    let maxBlogs = 0;
    let maxAuthor = '';
  
    for (const author in blogCounts) {
      if (blogCounts[author] > maxBlogs) {
        maxBlogs = blogCounts[author];
        maxAuthor = author;
      }
    }
  
    return maxBlogs === 0 ? null : { author: maxAuthor, blogs: maxBlogs };
  }

  const mostLikes = (blogs) => {
    const likesByAuthor = {};
    
    blogs.forEach(blog => {
        if (!likesByAuthor[blog.author]) {
            likesByAuthor[blog.author] = 0;
        }
        likesByAuthor[blog.author] += blog.likes;
    });
    
    let maxLikes = 0;
    let maxAuthor = '';
    
    for (const author in likesByAuthor) {
        if (likesByAuthor[author] > maxLikes) {
        maxLikes = likesByAuthor[author];
        maxAuthor = author;
        }
    }

    return maxLikes === 0 ? null : { author: maxAuthor, likes: maxLikes };
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }


