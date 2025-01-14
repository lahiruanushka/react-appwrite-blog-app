import { Account, ID } from "appwrite";
import client from "../conf/appwriteClient";
import userService from "./userService"; // Import UserService
import { createUsername } from "../utils/usernameUtils";

export class AuthService {
  constructor() {
    this.account = new Account(client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Ensure user is authenticated before sending verification
        const session = await this.login({ email, password });

        // Now that the user is logged in, get the current user
        const currentUser = await this.getCurrentUser();

        const username = createUsername(name);

        // Create profile for the user
        await userService.createUserProfile(currentUser.$id, username, name);

        if (session) {
          this.createVerification();
        } else {
          console.error("User authentication failed after account creation.");
        }
      }
    } catch (error) {
      console.error("Error in createAccount:", error);
      throw error;
    }
  }

  async createVerification() {
    try {
      return await this.account.createVerification(
        `${import.meta.env.VITE_FRONTEND_URL}/verify-email/verify`
      );
    } catch (error) {
      console.error("Error in createVerification:", error);
      throw error;
    }
  }

  async completeEmailVerification(userId, secret) {
    try {
      return await this.account.updateVerification(userId, secret);
    } catch (error) {
      console.log("Error in verify email:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      return await this.account.createRecovery(
        email,
        `${import.meta.env.VITE_FRONTEND_URL}/reset-password`
      );
    } catch (error) {
      console.error("Error in sendPasswordResetEmail:", error);
      throw error;
    }
  }

  async resetPassword(userId, secret, password, confirmPassword) {
    try {
      return await this.account.updateRecovery(
        userId,
        secret,
        password,
        confirmPassword
      );
    } catch (error) {
      console.error("Error in resetPassword:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Error in logout:", error);
      throw error;
    }
  }

  async checkAuth() {
    try {
      // Attempt to get the current user
      return await this.account.get(); // This will throw if not authenticated
    } catch (error) {
      console.error("User is not authenticated:", error);
      return null; // Return null if not authenticated
    }
  }

  async signInWithGoogle() {
    try {
      // Start OAuth session
      await this.account.createOAuth2Session(
        'google',
        `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`, // Redirect to our callback handler
        `${import.meta.env.VITE_FRONTEND_URL}/login`,         // Failure URL
      );
    } catch (error) {
      console.error("Error in Google OAuth:", error);
      throw error;
    }
  }

  async handleOAuthCallback() {
    try {
      // Get the current user after OAuth redirect
      const user = await this.account.get();
      
      // Check if this is a new user by trying to get their profile
      let userProfile;
      try {
        userProfile = await userService.getUserProfile(user.$id);
      } catch (error) {
        // If profile doesn't exist, create one for the new user
        if (error.code === 404) {
          const name = user.name || 'User';
          const username = createUsername(name);
          
          userProfile = await userService.createUserProfile(
            user.$id,
            username,
            name,
            {
              email: user.email,
              emailVerified: true, // Google OAuth emails are verified
              avatarUrl: user.prefs?.avatar || '',
              provider: 'google'
            }
          );
        } else {
          throw error;
        }
      }

      return {
        user,
        profile: userProfile
      };
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      throw error;
    }
  }

  // Helper method to check if user exists
  async checkUserExists(email) {
    try {
      // Try to get list of sessions for this email
      const sessions = await this.account.listSessions();
      return sessions.total > 0;
    } catch (error) {
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
