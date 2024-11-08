import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

class PostService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.databases = new Databases(this.client);
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
}

const postService = new PostService();
export default postService;
