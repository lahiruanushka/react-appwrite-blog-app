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

      const username = createUsername(name);

      if (userAccount) {
        // Log in the user after account creation
        await this.login({ email, password });

        // Now that the user is logged in, get the current user
        const currentUser = await this.getCurrentUser();

        // Create profile for the user
        await userService.createUserProfile(currentUser.$id, username);
        return currentUser;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error in createAccount:", error);
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
}

const authService = new AuthService();
export default authService;
