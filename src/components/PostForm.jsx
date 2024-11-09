// components/PostForm/PostForm.jsx
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import appwriteService from "../services/storageService";
import { Input, RTE, Button } from "../components";
import { MdOutlineTitle } from "react-icons/md";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [preview, setPreview] = React.useState(post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
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
      setPreview(URL.createObjectURL(file));
    }
  };

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
                    message: "Title must be at least 3 characters"
                  }
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
                    message: "Slug can only contain lowercase letters, numbers, and hyphens"
                  }
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
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="image-upload"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", { required: !post })}
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="relative block w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
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
                          onClick={() => setPreview(null)}
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

              {/* Status Select */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className={`w-full ${post ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                {isSubmitting ? 'Saving...' : (post ? 'Update Post' : 'Publish Post')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
