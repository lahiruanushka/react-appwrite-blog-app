import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import AuthorPage from "./pages/AuthorPage";
import UserProfilePage from "./pages/UserProfilePage";
import PostPage from "./pages/PostPage";
import { Header, Footer, ScrollToTop } from "./components";
import NotFoundPage from "./pages/NotFoundPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import BookmarksPage from "./pages/BookmarksPage";
import { useSelector } from "react-redux";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Header />
      <ToastProvider>
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
          <Route path="/signup" element={<SignUpPage />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Scroll to top on every route change */}
        <ScrollToTop />

        <Footer />
      </ToastProvider>
    </Router>
  );
}

export default App;
