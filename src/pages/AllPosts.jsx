import appwriteService from "../appwrite/config";
import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts([]);
        if (posts) {
          console.log(posts);
          setPosts(posts.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle case for empty posts array
  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <h2>No posts available.</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
