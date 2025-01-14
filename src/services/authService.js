import { Account, ID } from "appwrite";
import client from "../conf/appwriteClient";
import userService from "./userService";
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
        const session = await this.login({ email, password });
        const currentUser = await this.getCurrentUser();
        const username = createUsername(name);

        await userService.createUserProfile(currentUser.$id, username, name, {
          email,
          emailVerified: false,
          provider: "email",
        });

        if (session) {
          await this.createVerification();
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
      console.error("Error in verify email:", error);
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
      return await this.account.get();
    } catch (error) {
      console.error("User is not authenticated:", error);
      return null;
    }
  }

  // Unified OAuth method
  async signInWithOAuth(provider, scopes = []) {
    try {
      await this.account.createOAuth2Session(
        provider,
        `${import.meta.env.VITE_FRONTEND_URL}/auth/callback`,
        `${import.meta.env.VITE_FRONTEND_URL}/login`,
        scopes
      );
    } catch (error) {
      console.error(`Error in ${provider} OAuth:`, error);
      throw error;
    }
  }

  // Convenience methods for specific providers
  async signInWithGoogle() {
    return this.signInWithOAuth("google");
  }

  async signInWithFacebook() {
    return this.signInWithOAuth("facebook", ["email", "public_profile"]);
  }

  // Unified OAuth callback handler
  async handleOAuthCallback(provider = null) {
    try {
      const user = await this.account.get();

      let userProfile;
      try {
        userProfile = await userService.getUserProfile(user.$id);
      } catch (error) {
        if (error.code === 404) {
          const name = user.name || "User";
          const username = createUsername(name);

          userProfile = await userService.createUserProfile(
            user.$id,
            username,
            name,
            {
              email: user.email,
              emailVerified: true,
              avatarUrl: user.prefs?.avatar || "",
              provider: provider || "oauth",
            }
          );
        } else {
          throw error;
        }
      }

      return { user, profile: userProfile };
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
