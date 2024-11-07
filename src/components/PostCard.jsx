import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { FaChevronRight } from "react-icons/fa";

function PostCard({ $id, title, featuredimage }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      if (featuredimage) {
        try {
          const url = await appwriteService.getFilePreview(featuredimage);
          setPreviewUrl(url);
        } catch (error) {
          console.error("Error fetching image preview:", error);
        }
      }
    };

    fetchPreviewUrl();
  }, [featuredimage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full sm:w-72 bg-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="w-full rounded-t-xl overflow-hidden">
          {featuredimage && previewUrl ? (
            <img src={previewUrl} alt={title} className="w-full h-48 object-cover" />
          ) : (
            <div className="bg-gray-300 h-48 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
          <div className="flex items-center justify-end text-gray-500 hover:text-gray-700 mt-2">
            <span>Read More</span>
            <FaChevronRight className="ml-2 w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;