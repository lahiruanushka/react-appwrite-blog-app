import React from "react";
import { PostForm } from "../components";

function AddPostPage() {
  return (
    <div className="min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 mx-auto">
      <PostForm />
    </div>
  );
}

export default AddPostPage;
