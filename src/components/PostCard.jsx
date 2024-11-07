import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Storage } from "appwrite";

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
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {featuredimage && previewUrl ? (
            <img src={previewUrl} alt={title} className="rounded-xl" />
          ) : (
            <div className="bg-gray-300 h-48 rounded-xl flex items-center justify-center">
              <span>No Image Available</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
