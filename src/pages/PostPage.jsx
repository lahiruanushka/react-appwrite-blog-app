import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import postService from "../services/postService";
import userService from "../services/userService";
import storageService from "../services/storageService";
import { LuBookmark, LuBookMarked, LuShare2, LuTrash2 } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";
import { Puff } from "react-loader-spinner";
import { useToast } from "../context/ToastContext";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;
  const { showToast } = useToast();

  useEffect(() => {
    fetchPostAndImage();
  }, [postId, navigate]);

  const fetchPostAndImage = async () => {
    try {
      if (postId) {
        setLoading(true);
        const fetchedPost = await postService.getPost(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
          fetchPostAuthor(fetchedPost.userid);
          const url = await storageService.getFilePreview(
            fetchedPost.featuredImage
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

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    showToast(
      "Link copied to clipboard!",
      <LuShare2 className="h-6 w-6 text-green-400" />
    );
  };

  const handleBookmark = async () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      showToast(
        "Remove from Bookmarks!",
        <LuBookmark className="h-6 w-6 text-blue-400" />
      );
    } else {
      setIsBookmarked(true);
      showToast(
        "Added to Bookmarks!",
        <LuBookmark className="h-6 w-6 text-blue-400" />
      );
    }
  };

  const deletePost = async () => {
    try {
      if (post) {
        const status = await postService.deletePost(post.$id);
        if (status) {
          await storageService.deleteFile(post.featuredImage);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#8a2be2"
          ariaLabel="puff-loading"
        />
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          Post not found
        </h2>
        <Link
          to="/"
          className="mt-4 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Return home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4"
    >
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Hero Image with Parallax Effect */}
          <motion.div
            className="relative h-[500px] w-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700">
              {imageUrl ? (
                <motion.img
                  src={imageUrl}
                  alt={post.title}
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: imageLoaded ? 1 : 0,
                    scale: imageLoaded ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-600 border-t-purple-500 animate-spin" />
                </div>
              )}

              {/* Bookmark Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBookmark}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm"
              >
                <LuBookMarked
                  className={`w-5 h-5 ${
                    isBookmarked
                      ? "fill-purple-500 text-purple-500"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                />
              </motion.button>
            </div>

            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="p-3 bg-white/90 dark:bg-gray-700/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiEdit2 className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-3 bg-white/90 dark:bg-gray-700/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-colors"
                >
                  <LuTrash2 className="w-5 h-5 text-red-500" />
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <div className="p-8">
            {user && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center space-x-4 mb-8"
              >
                <img
                  src={BlankProfilePicture}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500"
                />
                <div>
                  <Link
                    to={`/author/${user.$id}`}
                    className="font-semibold text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    @{user.name}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.created).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose dark:prose-invert max-w-none dark:text-white browser-css"
            >
              {parse(post.content)}
            </motion.div>
          </div>

          {/* Share Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-8 border-t border-gray-200 dark:border-gray-700"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              <LuShare2 className="w-5 h-5 mr-2" />
              Share Post
            </motion.button>
          </motion.div>
        </motion.div>
      </article>

      {/* Delete Confirmation Modal */}
      <Transition show={isDeleteModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Delete Post
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none"
                    onClick={deletePost}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </motion.div>
  );
};

export default PostPage;
