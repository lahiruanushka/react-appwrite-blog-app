import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ErrorMessage, Loading, PostCard } from "../components";
import bookmarkService from "../services/bookmarkService";
import { useSelector } from "react-redux";

const BookmarksPage = () => {
  const userData = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const getBookmarkedPosts = async () => {
      if (!userData?.$id) return;

      try {
        setLoading(true);
        const posts = await bookmarkService.getAllBookmarkedPosts(userData.$id);
        setBookmarkedPosts(posts);
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
        setError("Failed to get bookmarked posts. Please try again!");
      } finally {
        setLoading(false);
      }
    };

    getBookmarkedPosts();
  }, [userData]); // Add userData as dependency

  if (loading) {
    return <Loading loading={true} />;
  }

  if (error) {
    return <ErrorMessage title="Error" error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Bookmarked Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Bookmarked Posts
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post) => (
                <motion.div
                  key={post.$id}
                  className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="h-full">
                    <PostCard {...post} />
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center col-span-2 py-4">
                You haven&apos; t bookmarked any blog posts yet.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookmarksPage;
