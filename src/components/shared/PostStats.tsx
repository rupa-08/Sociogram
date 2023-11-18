import { Models } from "appwrite";

type postStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: postStatsProps) => {
  return (
    <div className="flex items-center justify-between z-20">
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/icons/like.svg"
          width={20}
          height={20}
          onClick={() => {}}
          alt="like"
          className="cursor-pointer"
        />

        <p className="small lg:base-medium">0</p>
      </div>

      <div className="flex gap-2">
        <img
          src="/assets/icons/save.svg"
          width={20}
          height={20}
          onClick={() => {}}
          alt="save"
          className="cursor-pointer"
        />

        <p className="small lg:base-medium">0</p>
      </div>
    </div>
  );
};

export default PostStats;
