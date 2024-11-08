import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

function PostPage() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State for the image URL
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          // Fetch the image preview URL
          appwriteService
            .getFilePreview(post.featuredimage)
            .then((url) => setImageUrl(url))
            .catch((error) =>
              console.error("Error fetching image preview:", error)
            );

          console.log("post", post);
          console.log("userData", userData);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12">
 
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            {imageUrl ? ( // Check if imageUrl is available
              <img
                src={imageUrl}
                alt={post.title}
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="bg-gray-300 h-64 flex items-center justify-center rounded-lg shadow-md">
                <span>Loading Image...</span>
              </div>
            )}
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
          {isAuthor && (
            <div className="flex justify-end gap-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor={"bg-orange-500"} >
                  <FaRegEdit className="mr-2" />
                </Button>
              </Link>
              <Button bgColor={"bg-red-500"} onClick={deletePost}>
                <FaTrashAlt className="mr-2" />
              </Button>
            </div>
          )}
        </div>

    </div>
  ) : null;
}

export default PostPage;
