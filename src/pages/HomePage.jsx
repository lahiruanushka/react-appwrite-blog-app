import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SearchBar,
  HeroSection,
  FeaturedPosts,
  CategoryFilter,
  ErrorMessage,
  Loading,
} from "../components";
import { Puff } from "react-loader-spinner";
import postService from "../services/postService";
import DiscoverStories from "../components/DiscoverStories";
import ScrollToTopButton from "../components/ScrollToTopButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postService.getPosts();
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = () => {
    // Implement search functionality
  };

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Development" },
    { id: 3, name: "Design" },
    { id: 4, name: "Marketing" },
    { id: 5, name: "Business" },
  ];

  if (loading) {
    return <Loading loading={true} />;
  }

  if (error) {
    return <ErrorMessage title="Failed to fetch posts" error={error} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      {/* Fixed Header with Search Toggle */}
      <motion.div
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
            onClick={() => setSearchVisible(!searchVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.button>
        </div>

        {/* Animated Search Bar */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: searchVisible ? "auto" : 0,
            opacity: searchVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 space-y-16 py-8">
        <HeroSection />

        <div className="grid gap-8 md:grid-cols-1">
          <div className="space-y-8">
            <DiscoverStories posts={posts} />
          </div>
          <div className="space-y-8">
            <FeaturedPosts posts={posts} />
          </div>
        </div>

        <ScrollToTopButton />
      </div>
    </motion.div>
  );
}

export default Home;
