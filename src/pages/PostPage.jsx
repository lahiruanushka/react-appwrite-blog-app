import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { FiEdit2, FiTrash2, FiShare2 } from "react-icons/fi";
import { Puff } from "react-loader-spinner";
import postService from "/src/api/postService";
import storageService from "../api/storageService";
import userService from "../api/userService";
import BlankProfileImage from "../assets/images/blank-profile-picture.png";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    const fetchPostAndImage = async () => {
      try {
        if (postId) {
          setLoading(true);
          const fetchedPost = await postService.getPost(postId);
          if (fetchedPost) {
            setPost(fetchedPost);
            fetchPostAuthor(fetchedPost.userid);
            const url = await storageService.getFilePreview(
              fetchedPost.featuredimage
            );
            setImageUrl(url);
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndImage();
  }, [postId, navigate]);

  const fetchPostAuthor = async (userId) => {
    try {
      if (userId) {
        const fetchedUser = await userService.getUser(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deletePost = async () => {
    try {
      if (post) {
        const status = await postService.deletePost(post.$id);
        if (status) {
          await storageService.deleteFile(post.featuredimage);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#8a2be2"
          ariaLabel="puff-loading"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <article className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[400px] w-full">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            )}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link
                  to={`/edit-post/${post.$id}`}
                  className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiEdit2 className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                </Link>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiTrash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            {user && (
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={user.image || BlankProfileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <Link
                  to={`/author/${user.$id}`}
                  className="font-semibold text-gray-800 dark:text-white"
                >
                  @{user.name}
                </Link>
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              {parse(post.content)}
            </div>
          </div>

          {/* Share Button */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiShare2 className="w-5 h-5 mr-2" />
              Share Post
            </button>
          </div>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      <Transition.Root show={isDeleteModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsDeleteModalOpen}
        >
          <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Delete Post
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Are you sure you want to delete this post? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deletePost}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default PostPage;
