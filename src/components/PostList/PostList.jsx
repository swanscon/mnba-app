import { useEffect, useState } from "react";
import { fetchPosts } from "../../utils/redditApi";
import Post from "../Post/Post";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };
        getPosts();
    }, []);

    return (
        <div>
            <h1>r/NBA Posts</h1>
            <div>
                {posts.slice(0, 25).map(post => {
                    return (
                        <div key={post.id}>
                            <Post post={post} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PostList;