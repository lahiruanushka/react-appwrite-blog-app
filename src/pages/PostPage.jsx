import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import {
  LuBookmark,
  LuBookMarked,
  LuShare2,
  LuTrash2,
  LuClock,
  LuUser,
} from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";
import { useToast } from "../context/ToastContext";
import { LoginPrompt } from "../components";
import postService from "../services/postService";
import storageService from "../services/storageService";
import userService from "../services/userService";
import bookmarkService from "../services/bookmarkService";
import { Puff } from "react-loader-spinner";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { showToast } = useToast();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchPostAndImage();
  }, [postId]);

  const fetchPostAndImage = async () => {
    try {
      if (postId) {
        setLoading(true);
        const fetchedPost = await postService.getPost(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
          fetchPostAuthor(fetchedPost.userId);
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
        const fetchedUser = await userService.getUserProfile(userId);
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

  const handleBookmark = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      if (isBookmarked) {
        const bookmarks = await bookmarkService.getUserBookmarks(userData.$id);

        const bookmarkToRemove = bookmarks.find((b) => b.postId === postId);

        if (bookmarkToRemove) {
          await bookmarkService.removeBookmark(bookmarkToRemove.$id);
          setIsBookmarked(false);
          showToast(
            "Removed from Bookmarks!",
            <LuBookmark className="h-6 w-6 text-blue-400" />
          );
        }
      } else {
        await bookmarkService.addBookmark(userData.$id, postId);
        setIsBookmarked(true);
        showToast(
          "Added to Bookmarks!",
          <LuBookmark className="h-6 w-6 text-blue-400" />
        );
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
      showToast("An error occurred while updating bookmarks.");
    }
  };

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const status = await bookmarkService.isPostBookmarked(
        userData?.$id,
        postId
      );
      setIsBookmarked(status);
    };

    checkBookmarkStatus();
  }, [postId, userData?.$id]);

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

  const handleAuthorClick = (userId) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    navigate(`/author/${userId}`);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4"
      >
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          Post not found
        </h2>
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return home
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      {/* Floating Action Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate max-w-md">
                {post.title}
              </h2>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LuBookMarked
                    className={`w-5 h-5 ${
                      isBookmarked
                        ? "fill-purple-500 text-purple-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LuShare2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          {imageUrl && (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <motion.img
                src={imageUrl}
                alt={post.title}
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70" />
            </motion.div>
          )}

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                {post.title}
              </motion.h1>

              {user && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-6"
                >
                  <div
                    onClick={() => {
                      handleAuthorClick(user.$id);
                    }}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <img
                      src={BlankProfilePicture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full ring-2 ring-purple-500 group-hover:ring-purple-400 transition-all"
                    />
                    <div>
                      <p className="font-medium text-white group-hover:text-purple-200 transition-colors">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-300">@{user.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <LuClock className="w-4 h-4 mr-2" />
                    <time dateTime={post.$updatedAt}>
                      {new Date(post.$updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-12"
          >
            <div className="prose dark:prose-invert max-w-none dark:text-white">
              {parse(post.content)}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 space-y-4"
            >
              {isAuthor && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <FiEdit2 className="w-5 h-5 mr-2" />
                    Edit Post
                  </Link>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <LuTrash2 className="w-5 h-5 mr-2" />
                    Delete Post
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <Dialog
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <div className="min-h-screen px-4 text-center flex items-center justify-center">
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-auto shadow-xl"
              >
                <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Delete Post
                </Dialog.Title>
                <Dialog.Description className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </Dialog.Description>

                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={deletePost}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Login Prompt */}
      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </>
  );
};

export default PostPage;
