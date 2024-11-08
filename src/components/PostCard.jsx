import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import parse from "html-react-parser";
import storageService from "../api/storageService";

function PostCard({
  $createdAt,
  $id,
  $updatedAt,
  content,
  featuredimage,
  title,
  userid,
  $slug,
}) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      if (featuredimage) {
        try {
          const url = await storageService.getFilePreview(featuredimage);
          setPreviewUrl(url);
        } catch (error) {
          console.error("Error fetching image preview:", error);
        }
      }
    };
    fetchPreviewUrl();
  }, [featuredimage]);

  return (
    <div className="w-full sm:w-80 max-w-sm transform transition duration-300 ease-in-out hover:scale-105">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Image Section */}
        <div className="w-full h-48 overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"></div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2">
            {title}
          </h2>
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {parse(content)}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            {/* Date Info */}
            <div>
              <p>
                {$updatedAt
                  ? format(new Date($updatedAt), "MMM d, yyyy")
                  : format(new Date($createdAt), "MMM d, yyyy")}
              </p>
            </div>

            {/* Read More Link */}
            <Link to={`/post/${$id}`}>
              <div className="flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                <span className="mr-1">Read More</span>
                <FaChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
