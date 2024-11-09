import { Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import client from "../conf/appwriteClient";

class PostService {
  constructor() {
    this.databases = new Databases(client);
  }

  async createPost(data) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(), // Use a unique ID for the document
        data
      );
    } catch (error) {
      console.error("PostService :: createPost() :: ", error);
      throw error; // Rethrow the error for further handling if needed
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("PostService :: getPost() :: ", error);
      throw error;
    }
  }

  async updatePost(documentId, data) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        data
      );
    } catch (error) {
      console.error("PostService :: updatePost() :: ", error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("PostService :: deletePost() :: ", error);
      throw error;
    }
  }

  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("PostService :: getPosts() :: ", error);
      throw error;
    }
  }

  async getUserPosts(userId) {
    if (!userId) {
      throw new Error("User ID must be provided");
    }

    const queries = [Query.equal("userId", userId)];

    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      return response.documents; // Return the array of documents
    } catch (error) {
      console.error("PostService :: getUserPosts() :: ", error);
      throw error;
    }
  }
}

const postService = new PostService();
export default postService;
