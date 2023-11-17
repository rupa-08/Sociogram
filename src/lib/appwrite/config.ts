import {
  VITE_APPWRITE_DATABASE_ID,
  VITE_APPWRITE_PROJECT_ID,
  VITE_APPWRITE_STORAGE_ID,
  VITE_APPWRITE_URL,
  VITE_POST_COLLECTION_ID,
  VITE_SAVES_COLLECTION_ID,
  VITE_USER_COLLECTION_ID,
} from "@/constants";
import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  // url: import.meta.env.VITE_APPWRITE_URL,
  // projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: VITE_APPWRITE_URL,
  projectId: VITE_APPWRITE_PROJECT_ID,
  databaseId: VITE_APPWRITE_DATABASE_ID,
  storageId: VITE_APPWRITE_STORAGE_ID,
  userCollectionId: VITE_USER_COLLECTION_ID,
  postCollectionId: VITE_POST_COLLECTION_ID,
  savesCollectionId: VITE_SAVES_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
