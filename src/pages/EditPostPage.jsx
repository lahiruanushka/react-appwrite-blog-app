import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PostForm } from "../components";
import postService from "../services/postService";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostToEdit = async () => {
      if (postId) {
        try {
          const fetchedPost = await postService.getPost(postId);
          if (fetchedPost) {
            console.log(fetchedPost);
            setPost(fetchedPost);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchPostToEdit();
  }, [postId]);

  return (
    <div className="min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 mx-auto">
      <PostForm post={post} />
    </div>
  );
}

export default EditPostPage;
