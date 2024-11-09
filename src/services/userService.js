import { Account } from "appwrite";
import client from "../conf/appwriteClient";

class UserService {
  constructor() {
    this.account = new Account(client);
  }

  async getUser(userId) {
    try {
      return await this.account.get(userId); // Fetch the user by ID
    } catch (error) {
      console.error("UserService :: getUser() :: ", error);
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
