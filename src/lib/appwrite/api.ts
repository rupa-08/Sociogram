import { ID } from "appwrite";
import { INewUser } from "@/types";

import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;

    // creating image url with appwrite avatar
    const avatarURL = avatars.getInitials(user.name);

    // saving user to database
    const newUser = await saveUserToDB({
      accountId: newAccount?.$id,
      email: newAccount?.email,
      name: newAccount?.name,
      imageUrl: avatarURL,
      username: user.username,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig?.databaseId,
      appwriteConfig?.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
