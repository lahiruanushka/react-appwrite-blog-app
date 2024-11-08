import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../api/storageService";
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
    <div className="py-6">
      <PostForm post={post} />
    </div>
  );
}

export default EditPostPage;
