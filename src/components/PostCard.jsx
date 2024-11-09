import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import parse from "html-react-parser";
import storageService from "../services/storageService";
import {
  LuBookmark,
  LuBookMarked,
  LuCalendar,
  LuClock,
} from "react-icons/lu";
import { useToast } from "../context/ToastContext";

const PostCard = ({
  $createdAt,
  $id,
  $updatedAt,
  content,
  featuredImage,
  title,
  userid,
  $slug,
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      if (featuredImage) {
        try {
          const url = await storageService.getFilePreview(featuredImage);
          setPreviewUrl(url);
          console.log(previewUrl)
        } catch (error) {
          console.error("Error fetching image preview:", error);
        }
      }
    };
    fetchPreviewUrl();
  }, [featuredImage]);

  const handleBookmark = async (e) => {
    e.preventDefault();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="block h-full">
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700">
            {previewUrl ? (
              <motion.img
                src={previewUrl}
                alt={title}
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

          {/* Content Container */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {title}
            </h2>

            <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {parse(content)}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <LuCalendar className="w-4 h-4" />
                  <span>
                    {format(new Date($updatedAt || $createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <LuClock className="w-4 h-4" />
                  <span>{Math.ceil(content.length / 1000)} min read</span>
                </div>
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium"
              >
                <div className="card-content">
                  <Link to={`/post/${$id}`}>
                    <span>Read More</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
