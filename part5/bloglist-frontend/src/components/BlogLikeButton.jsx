import React from 'react'

const BlogLikeButton = ({ handleClickLike={ handleClickLike }, blog={ blog } }) => {

  return (
    <button onClick={() => handleClickLike(blog)}>like</button>
  )
}

export default BlogLikeButton