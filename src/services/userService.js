import { Account, Databases } from "appwrite";
import client from "../conf/appwriteClient";
import conf from "../conf/conf";

class UserService {
  constructor() {
    this.account = new Account(client);
    this.databases = new Databases(client);
  }

  async getUserProfile(userId) {
    if (!userId) {
      throw new Error("User ID must be provided");
    }

    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserProfileCollectionId,
        userId
      );
    } catch (error) {
      console.error("UserService :: getUserProfile() :: ", error);
      throw error;
    }
  }

  async createUserProfile(userId, username, fullName) {
    if (!userId || !username || !fullName) {
      throw new Error("User ID, Full Name and username must be provided");
    }

    const userProfileData = {
      userId: userId,
      username: username,
      fullName: fullName,
    };

    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserProfileCollectionId,
        userId, // Use userId as the document ID
        userProfileData
      );
    } catch (error) {
      console.error("UserService :: createUserProfile() :: ", error);
      throw error;
    }
  }

  async updateCurrentUser(name) {
    try {
      return await this.account.updateName(name);
    } catch (error) {
      console.error("UserService :: updateUser() :: ", error);
      throw error;
    }
  }

  async deleteCurrentUser() {
    try {
      return await this.account.delete(); // Deletes the currently logged-in user
    } catch (error) {
      console.error("UserService :: deleteUser() :: ", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
