import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import Input from "./Input"
import { handlePostState, useSSRPostsState } from '../atoms/postAtom'
import Post from "./Post";

function Feed({ posts }) {
  const [realTimePosts, setRealimePosts] = useState([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })

      const responseData = await response.json()
      setRealimePosts(responseData)
      setHandlePost(false)
      setUseSSRPosts(false)
    }

    fetchPosts()
  }, [handlePost]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* Posts */}
      {!useSSRPosts ? realTimePosts.map(post => (
        <Post post={post} key={post._id} />
      )) : posts.map(post => (
        <Post post={post} key={post._id} />
      ))
      }
    </div>
  )
}

export default Feed
