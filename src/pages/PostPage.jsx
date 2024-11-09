import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { FiEdit2, FiTrash2, FiShare2 } from "react-icons/fi";
import { Puff } from "react-loader-spinner";
import postService from "/src/services/postService";
import storageService from "../services/storageService";
import userService from "../services/userService";
import BlankProfileImage from "../assets/images/blank-profile-picture.png";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    const fetchPostAndImage = async () => {
      try {
        if (postId) {
          setLoading(true);
          const fetchedPost = await postService.getPost(postId);
          if (fetchedPost) {
            setPost(fetchedPost);
            fetchPostAuthor(fetchedPost.userid);
            const url = await storageService.getFilePreview(
              fetchedPost.featuredimage
            );
            setImageUrl(url);
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndImage();
  }, [postId, navigate]);

  const fetchPostAuthor = async (userId) => {
    try {
      if (userId) {
        const fetchedUser = await userService.getUser(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deletePost = async () => {
    try {
      if (post) {
        const status = await postService.deletePost(post.$id);
        if (status) {
          await storageService.deleteFile(post.featuredimage);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#8a2be2"
          ariaLabel="puff-loading"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <article className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[400px] w-full">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            )}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link
                  to={`/edit-post/${post.$id}`}
                  className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiEdit2 className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                </Link>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiTrash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {user && (
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={user.image || BlankProfileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <Link
                  to={`/author/${user.$id}`}
                  className="font-semibold text-gray-800 dark:text-white"
                >
                  @{user.name}
                </Link>
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {parse(post.content)}
            </div>
          </div>

          {/* Share Button */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiShare2 className="w-5 h-5 mr-2" />
              Share Post
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostPage;
