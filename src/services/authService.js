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
}

const authService = new AuthService();
export default authService;
