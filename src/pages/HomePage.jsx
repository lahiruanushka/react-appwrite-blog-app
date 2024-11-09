import React, { useState, useEffect } from "react";
import {
  SearchBar,
  HeroSection,
  FeaturedPosts,
  CategoryFilter,
  PopularPosts,
} from "../components";

import { Puff } from "react-loader-spinner";
import postService from "../services/postService";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSearch = () => {};

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Development" },
    { id: 3, name: "Design" },
    { id: 4, name: "Marketing" },
    { id: 5, name: "Business" },
  ];

  return (
    <div className="w-full py-8 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <HeroSection />
      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#8a2be2"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
        </div>
      )}

      <FeaturedPosts posts={posts} />
      <CategoryFilter categories={categories} />
      <SearchBar onSearch={handleSearch} />
      <PopularPosts posts={posts} />
    </div>
  );
}

export default Home;
