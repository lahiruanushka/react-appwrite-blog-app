import { Client, Account } from "appwrite"; 
import conf from "../conf/conf";

class UserService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId); 
    this.account = new Account(this.client); 
  }

  async createUser(email, password, name) {
    try {
      return await this.account.create(email, password, name);
    } catch (error) {
      console.error("UserService :: createUser() :: ", error);
      throw error;
    }
  }
  
  async getCurrentUser() {
    try {
      return await this.account.get(); // Get currently logged-in user
    } catch (error) {
      console.error("UserService :: getUser() :: ", error);
      throw error;
    }
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