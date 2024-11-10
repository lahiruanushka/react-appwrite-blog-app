import { Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import client from "../conf/appwriteClient";

class BookmarkService {
  constructor() {
    this.databases = new Databases(client);
    this.bookmarkCollectionId = conf.appwriteBookmarkCollectionId;
  }

  // Add a bookmark for a post
  async addBookmark(userId, postId) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        this.bookmarkCollectionId,
        ID.unique(),
        {
          userId: userId,
          postId: postId,
          createdAt: new Date().toISOString(), // timestamp
        }
      );
    } catch (error) {
      console.error("BookmarkService :: addBookmark() :: ", error);
      throw error;
    }
  }

  // Remove a bookmark
  async removeBookmark(bookmarkId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        this.bookmarkCollectionId,
        bookmarkId
      );
    } catch (error) {
      console.error("BookmarkService :: removeBookmark() :: ", error);
      throw error;
    }
  }

  // Get all bookmarks for a user
  async getUserBookmarks(userId) {
    if (!userId) {
      throw new Error("User ID must be provided");
    }

    const queries = [Query.equal("userId", userId)];

    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        this.bookmarkCollectionId,
        queries
      );
      return response.documents; // Return the array of bookmarked documents
    } catch (error) {
      console.error("BookmarkService :: getUserBookmarks() :: ", error);
      throw error;
    }
  }

  // Check if a specific post is bookmarked by the user
  async isPostBookmarked(userId, postId) {
    if (!userId || !postId) {
      throw new Error("User ID and Post ID must be provided");
    }

    const queries = [
      Query.equal("userId", userId),
      Query.equal("postId", postId),
    ];

    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        this.bookmarkCollectionId,
        queries
      );
      return response.documents.length > 0; // Returns true if there is at least one bookmark for the post
    } catch (error) {
      console.error("BookmarkService :: isPostBookmarked() :: ", error);
      throw error;
    }
  }
}

const bookmarkService = new BookmarkService();
export default bookmarkService;