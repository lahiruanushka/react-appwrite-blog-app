import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { LuCalendar, LuLogOut, LuMail, LuTrash2, LuUser } from "react-icons/lu";
import { ErrorMessage, Loading, PostCard } from "../components";
import postService from "../services/postService";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import userService from "../services/userService";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      setLoading(true); // Start loading when the fetch begins
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          const userProfile = await userService.getUserProfile(currentUser.$id);

          setUser({
            ...currentUser,
            ...userProfile,
          });

          const userPosts = await postService.getUserPosts(currentUser.$id);
          setUserPosts(userPosts);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInformation();
  }, []);

  const handleSignOut = async () => {
    try {
      authService.logout().then(() => {
        dispatch(logout());
      });
      navigate("/login");
    } catch (err) {
      setError("Failed to sign out. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteCurrentUser();
      navigate("/login");
    } catch (err) {
      setError("Failed to delete account. Please try again.");
    }
  };

  if (loading) {
    return <Loading loading={true} />;
  }

  if (error) {
    return <ErrorMessage title={error} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <LuUser className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </motion.div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user?.name}
              </h1>
              <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <LuMail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <LuCalendar className="w-4 h-4" />
                  <span>
                    Joined {new Date(user?.$createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Blog Posts
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            {userPosts.map((post) => (
              <motion.div
                key={post.$id}
                className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="h-full">
                  <PostCard {...post} />
                </div>
              </motion.div>
            ))}
            {userPosts.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No blog posts yet.
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Account Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="inline-flex items-center px-12 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <LuLogOut className="w-5 h-5 mr-2" />
              Sign Out
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LuTrash2 className="w-5 h-5 mr-2" />
              Delete Account
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Delete Account
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
