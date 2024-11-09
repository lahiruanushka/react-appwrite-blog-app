import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../services/storageService";
import { useEffect } from "react";
import { PostForm } from "../components";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return (
    <div className="min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 mx-auto">
      <PostForm post={post} />
    </div>
  );
}

export default EditPostPage;
