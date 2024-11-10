import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  LuCalendar,
  LuMail,
  LuUser,
  LuUser2,
  LuLayout,
  LuGrid,
  LuBookmark,
  LuShare2,
} from "react-icons/lu";
import { ErrorMessage, Loading, PostCard } from "../components";
import postService from "../services/postService";
import userService from "../services/userService";
import authService from "../services/authService";

const AuthorPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [stats, setStats] = useState({ posts: 0, views: 0, bookmarks: 0 });
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { authorId } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      setLoading(true);
      try {
        const [currentUser, userProfile, posts] = await Promise.all([
          authService.getCurrentUser(),
          userService.getUserProfile(authorId),
          postService.getUserPosts(authorId),
        ]);

        if (currentUser && userProfile) {
          setUser({ ...currentUser, ...userProfile });
          setUserPosts(posts);

          // Calculate stats
          setStats({
            posts: posts.length,
            views: posts.reduce((acc, post) => acc + (post.views || 0), 0),
            bookmarks: posts.reduce(
              (acc, post) => acc + (post.bookmarks || 0),
              0
            ),
          });
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInformation();
  }, [authorId]);

  if (loading) return <Loading loading={true} />;
  if (error) return <ErrorMessage title={error} error={error} />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sticky Header */}
      <AnimatePresence>
        {!isHeaderVisible && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <LuUser className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {user?.name}
                </h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <LuGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <LuLayout className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-12 space-y-8"
      >
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-purple-400 to-blue-500" />

          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="relative -mt-16 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden shadow-lg"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LuUser className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  @{user?.username}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <LuMail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <LuCalendar className="w-4 h-4 mr-2" />
                  Joined {new Date(user?.$createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.posts}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Posts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.views}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Views
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.bookmarks}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Bookmarks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Blog Posts
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <LuGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <LuLayout className="w-5 h-5" />
              </button>
            </div>
          </div>

          {userPosts.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {userPosts.map((post) => (
                  <motion.div
                    key={post.$id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <PostCard {...post} viewMode={viewMode} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <LuLayout className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No blog posts yet.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthorPage;
