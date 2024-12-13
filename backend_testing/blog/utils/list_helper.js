const dummy = (blogs) => {
    return 1
  }

const computeTotalLikes = blogs => {
    const reducer = (total, blog) => {
        return total += blog.likes
    }
    const totalLikes = blogs.reduce(reducer, 0)
    return totalLikes
}

const favoriteBlogPost = blogs => {
    const reducer = (current, blog) => {
        if (!current) {
            return blog
        }
        if (current.likes < blog.likes) {
            return blog
        }
        return current
    }
    return blogs.length > 0 ? blogs.reduce(reducer, null) : {}; // Return an empty object if no blogs
}

  const mostBlogs = blogs => {
    const authorCounts = blogs.reduce((acc, blog) => {
      if (!acc[blog.author]) {
        acc[blog.author] = 1;
      } else {
        acc[blog.author]++;
      }
      return acc;
    }, {});

    let maxAuthor = null;
    let maxCount = 0;
    for (const [author, count] of Object.entries(authorCounts)) {
      if (count > maxCount) {
        maxAuthor = author;
        maxCount = count;
      }
    }

    return { author: maxAuthor, blogs: maxCount };
  }


  const mostLikes = blogs => {
    const authorLikeCounts = blogs.reduce((acc, blog) => {
      if (!acc[blog.author]) {
        acc[blog.author] = blog.likes;
      } else {
        acc[blog.author] += blog.likes;
      }
      return acc;
    }, {});

    let maxAuthor = null;
    let maxCount = 0;
    for (const [author, totalLikes] of Object.entries(authorLikeCounts)) {
      if (totalLikes > maxCount) {
        maxAuthor = author;
        maxCount = totalLikes;
      }
    }

    return { author: maxAuthor, likes: maxCount };
  }

  
  module.exports = {
    dummy,
    computeTotalLikes,
    favoriteBlogPost,
    mostBlogs,
    mostLikes
  }