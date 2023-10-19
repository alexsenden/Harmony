import { Post } from '../models/post'
import React from 'react'
import PostCard from '../components/post/postCard'
import TextBlock from './text'

export default function PostFeed(posts: Array<Post>) {
  if (posts.length > 0) {
    return posts.map(each => {
      return <PostCard {...each} />
    })
  } else {
    return <TextBlock>No posts here</TextBlock>
  }
}