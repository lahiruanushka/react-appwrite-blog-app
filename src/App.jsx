import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastProvider } from "./context/ToastContext";

// Import pages and components
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import AuthorPage from "./pages/AuthorPage";
import UserProfilePage from "./pages/UserProfilePage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookmarksPage from "./pages/BookmarksPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  Header,
  Footer,
  ScrollToTop,
  AuthRoute,
  PrivateRoute,
  AuthCheck,
} from "./components";
import VerifyEmailInstructionsPage from "./pages/VerifyEmailInstructionsPage";
import VerifyEmailCompletePage from "./pages/VerifyEmailCompletePage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import OAuthCallback from "./components/OAuthCallback";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Header />
      <ToastProvider>
        <AuthCheck />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Auth Routes - for non-authenticated users */}
          <Route
            path="/sign-in"
            element={<AuthRoute element={<LoginPage />} />}
          />
          <Route
            path="/sign-up"
            element={<AuthRoute element={<SignUpPage />} />}
          />
          <Route
            path="/verify-email"
            element={<VerifyEmailInstructionsPage />}
          />
          <Route
            path="/verify-email/verify"
            element={<VerifyEmailCompletePage />}
          />
          <Route
            path="/forgot-password"
            element={<AuthRoute element={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<AuthRoute element={<ResetPasswordPage />} />}
          />
          <Route
            path="/auth/callback"
            element={<AuthRoute element={<OAuthCallback />} />}
          />

          {/* Private Routes - require authentication */}
          <Route
            path="/create-post"
            element={<PrivateRoute element={<AddPostPage />} />}
          />
          <Route
            path="/edit-post/:postId"
            element={<PrivateRoute element={<EditPostPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<UserProfilePage />} />}
          />
          <Route
            path="/bookmarks"
            element={<PrivateRoute element={<BookmarksPage />} />}
          />
          <Route
            path="/author/:authorId"
            element={<PrivateRoute element={<AuthorPage />} />}
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <ScrollToTop />
        <Footer />
      </ToastProvider>
    </Router>
  );
}

export default App;
