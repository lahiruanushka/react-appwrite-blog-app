const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwritePostCollectionId: String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID),
  appwriteBookmarkCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKMARK_COLLECTION_ID),
  appwriteUserProfileCollectionId: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION_ID),
  appwritePostCategoryCollectionId: String(import.meta.env.VITE_APPWRITE_POST_CATEGORY_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
