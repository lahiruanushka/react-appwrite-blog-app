import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LuCalendar,
  LuLogOut,
  LuMail,
  LuTrash2,
  LuUser,
  LuSave,
  LuX,
  LuFileEdit,
} from "react-icons/lu";
import { Input } from "../components";
import { logout } from "../store/authSlice";
import authService from "../services/authService";
import userService from "../services/userService";
import postService from "../services/postService";
import { ErrorMessage, Loading, PostCard } from "../components";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchUserInformation = async () => {
      setLoading(true);
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          const userProfile = await userService.getUserProfile(currentUser.$id);
          const userData = { ...currentUser, ...userProfile };
          setUser(userData);
          setFormData({
            fullName: userData.fullName || "",
            username: userData.username || "",
          });

          const posts = await postService.getUserPosts(currentUser.$id);
          setUserPosts(posts);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = async () => {
    const errors = {};

    // Name validation
    if (!formData.fullName.trim()) errors.name = "Name is required";

    // Username validations
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    // Check username uniqueness
    try {
      const isUnique = await userService.checkUsernameUniqueness(
        formData.username,
        user.username
      );
      if (!isUnique) {
        errors.username =
          "Username already exists. Please choose a different one.";
      }
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
    }

    return errors;
  };

  const handleUpdateProfile = async () => {
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const { username, fullName } = formData;

      await userService.updateUserProfile(user.$id, username, fullName);
      setUser((prev) => ({
        ...prev,
        ...formData,
      }));
      console.log("user data", user);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/sign-in");
    } catch (err) {
      setError("Failed to sign out. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteCurrentUser();
      navigate("/sign-in");
    } catch (err) {
      setError("Failed to delete account. Please try again.");
    }
  };

  if (loading) return <Loading loading={true} />;

  if (error) return <ErrorMessage title={error} error={error} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-lg"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LuUser className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </motion.div>

              {!isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <LuFileEdit className="w-4 h-4 mr-2" />
                  Edit Profile
                </motion.button>
              )}
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={formErrors.name}
                    icon={LuUser}
                    placeholder="Enter your name"
                  />
                  <Input
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={formErrors.username}
                    icon={LuUser}
                    placeholder="Enter your username"
                  />
                  <div className="flex gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUpdateProfile}
                      className="inline-flex items-center px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <LuSave className="w-4 h-4 mr-2" />
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <LuX className="w-4 h-4 mr-2" />
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {user?.fullName}
                  </h1>
                  <div className="text-lg text-gray-600 dark:text-gray-300">
                    @{user?.username}
                  </div>
                  <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <LuMail className="w-5 h-5" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <LuCalendar className="w-5 h-5" />
                      <span>
                        Joined {new Date(user?.$createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Blog Posts
          </h2>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {userPosts.map((post) => (
              <motion.div
                key={post.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
              >
                <PostCard {...post} />
              </motion.div>
            ))}
            {userPosts.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 col-span-full">
                No blog posts yet. Start writing your first post!
              </p>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Account Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="inline-flex items-center px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <LuLogOut className="w-5 h-5 mr-2" />
              Sign Out
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LuTrash2 className="w-5 h-5 mr-2" />
              Delete Account
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Delete Account
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone and all your data will be permanently deleted.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfilePage;
