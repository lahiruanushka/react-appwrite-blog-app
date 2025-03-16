import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import { Input, RTE, Button } from "../components";
import { MdOutlineTitle } from "react-icons/md";
import storageService from "../services/storageService";
import postService from "../services/postService";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: 1,
      status: "active",
      image: [],
    },
  });

  // Initialize form with post data
  useEffect(() => {
    const initializeForm = async () => {
      if (post) {
        // Reset form with post data
        reset({
          title: post.title,
          slug: post.slug,
          content: post.content,
          category: post.category,
          status: post.status,
          image: [],
        });

        // Set preview image if post has featuredImage
        if (post.featuredImage) {
          try {
            const imageUrl = await storageService.getFilePreview(
              post.featuredImage
            );
            setPreview(imageUrl);
          } catch (error) {
            console.error("Error loading featured image:", error);
            setImageError("Failed to load featured image");
          }
        }
      }
      setIsLoading(false);
    };

    initializeForm();
  }, [post, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await postService.getCategories();
        setCategories(categories.documents);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
        setImageError("Invalid file type. Please upload a PNG or JPG image.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setImageError("File size must be less than 10MB");
        return;
      }
      setImageError("");
      setPreview(URL.createObjectURL(file));
      setValue("image", [file]);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    setValue("image", []);
    if (!post?.featuredImage) {
      setImageError("Featured image is required");
    }
  };

  const submit = async (data) => {
    try {
      setImageError("");
      let fileId = post?.featuredImage;

      // Handle new image upload if provided
      if (data.image?.[0]) {
        const file = data.image[0];
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
          setImageError("Invalid file type. Please upload a PNG or JPG image.");
          return;
        }

        try {
          const uploadedFile = await storageService.uploadFile(file);
          fileId = uploadedFile.$id;

          // Delete old image if updating
          if (post?.featuredImage) {
            await storageService.deleteFile(post.featuredImage);
          }
        } catch (uploadError) {
          setImageError("Failed to upload image. Please try again.");
          return;
        }
      }

      // Check if we have either an existing image or a new one
      if (!fileId && !data.image?.[0]) {
        setImageError("Featured image is required");
        return;
      }

      const postData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        category: data.category,
        status: data.status,
        featuredImage: fileId,
      };

      if (post) {
        await postService.updatePost(post.$id, postData);
      } else {
        await postService.createPost({
          ...postData,
          userId: userData.$id,
        });
      }

      navigate("/profile");
    } catch (error) {
      console.error("Error submitting post:", error);
      setImageError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {post ? "Edit Post" : "Create New Post"}
        </h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Section */}
            <div className="lg:col-span-2 space-y-6">
              <Input
                label="Title"
                placeholder="Enter post title"
                error={errors.title?.message}
                icon={MdOutlineTitle}
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
              />
              <Input
                label="Slug"
                placeholder="post-url-slug"
                error={errors.slug?.message}
                {...register("slug", {
                  required: "Slug is required",
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message:
                      "Slug can only contain lowercase letters, numbers, and hyphens",
                  },
                })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <div className="prose max-w-none dark:prose-invert">
                  <RTE
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                  />
                </div>
              </div>
            </div>
            {/* Sidebar Section */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Featured Image
                  {imageError && (
                    <span className="text-red-500 ml-2">{imageError}</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="image-upload"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`relative block w-full aspect-video rounded-lg border-2 border-dashed ${
                      imageError
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-gray-600"
                    } p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer`}
                  >
                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <HiOutlineX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-blue-500">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG up to 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  {...register("category", { required: true })}
                  defaultValue=""
                  placeholder="Select Category"
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Select */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                  disabled
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className={`w-full ${
                  post ? "bg-green-500 hover:bg-green-600" : ""
                }`}
              >
                {isSubmitting
                  ? "Saving..."
                  : post
                  ? "Update Post"
                  : "Publish Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
