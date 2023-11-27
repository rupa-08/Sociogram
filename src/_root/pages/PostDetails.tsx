import { Link, useParams } from "react-router-dom";

import { formatDate } from "@/lib/utils";
import Loader from "@/components/shared/Loader";
import {
  useGetPostById,
  useGetUserPost,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";
import GridPostList from "@/components/shared/GridPostList";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { data: relatedPost, isPending: isLodingRelatedPost } = useGetUserPost(
    post?.creator?.$id
  );
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  console.log(relatedPost);
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card mt-7 ml-7">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator?.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageUrl || "/assets/images/profile.png"}
                  alt="creator"
                  className="w-8 h-8 rounded-full lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator?.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit-icon"
                    width={20}
                    height={20}
                  />
                </Link>

                <Button
                  className={`${
                    user?.id !== post?.creator?.$id && "hidden"
                  } ghost_details-delete_btn`}
                  variant="ghost"
                  onClick={handleDeletePost}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/40" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex- gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user?.id} />
            </div>
          </div>
        </div>
      )}
      <hr className="border w-full border-white/40 my-5" />
      <div className="w-full max-w-5xl mb-8">
        <h3 className="body-bold md:h3-bold mb-5">Related posts</h3>
        {isLodingRelatedPost ? (
          <Loader />
        ) : (
          <GridPostList
            posts={relatedPost?.documents}
            showStats={false}
            showUser={false}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
