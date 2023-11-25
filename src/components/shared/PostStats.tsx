import React, { useEffect, useState } from "react";

import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikedPost,
  useSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import Loader from "./Loader";

type postStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: postStatsProps) => {
  const likedList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likedList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikedPost();
  const { mutate: savePost, isPending: isSavingPost } = useSavedPost();
  const { mutate: deleteSavePost, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  useEffect(() => {
    setIsSaved(
      !!savedPostRecord
      // savedPostRecord ? true : false
    );
  }, [currentUser]);

  //   Like post
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  //   save post
  const savedPostRecord = currentUser?.save?.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    // unsaving post if user clicks saved post
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavePost(savedPostRecord.$id);
    } else {
      // saving post
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex items-center justify-between z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          width={20}
          height={20}
          onClick={handleLikePost}
          alt="like"
          className="cursor-pointer"
        />

        <p className="small lg:base-medium">{likes?.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            width={20}
            height={20}
            onClick={handleSavePost}
            alt="save"
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
