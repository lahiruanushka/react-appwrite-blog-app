import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Pages
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import AuthorPage from "./pages/AuthorPage";
import UserProfilePage from "./pages/UserProfilePage";
import PostPage from "./pages/PostPage";

// Admin Pages
// import AdminDashboard from './admin/AdminDashboard';
// import PostManagementPage from './admin/PostManagementPage';
// import CreateEditPostPage from './admin/CreateEditPostPage';
// import CategoryManagementPage from './admin/CategoryManagementPage';
// import CommentModerationPage from './admin/CommentModerationPage';
// import UserManagementPage from './admin/UserManagementPage';
// import SettingsPage from './admin/SettingsPage';

import { Header, Footer, ScrollToTop } from "./components";
import NotFoundPage from "./pages/NotFoundPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import BookmarksPage from "./pages/BookmarksPage";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Header />
      {/* Scroll to top on every route change */}
      <ScrollToTop />
      
      <Routes>
        {/* User-Facing Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/author/:authorId" element={<AuthorPage />} />

        {/* Private Routes */}
        <Route path="create-post" element={<AddPostPage />} />
        <Route path="edit-post/:postId" element={<EditPostPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Admin Routes */}
        {/* <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/posts" element={<PostManagementPage />} />
        <Route path="/admin/posts/new" element={<CreateEditPostPage />} />
        <Route path="/admin/posts/edit/:postId" element={<CreateEditPostPage />} />
        <Route path="/admin/categories" element={<CategoryManagementPage />} />
        <Route path="/admin/comments" element={<CommentModerationPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} /> */}

        {/* Redirect unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
