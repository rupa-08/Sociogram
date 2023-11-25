import { Link } from "react-router-dom";
import { Models } from "appwrite";

import { Button } from "../ui/button";

type UserCardProps = {
  users: Models.Document;
};
const UserCard = ({ users }: UserCardProps) => {
  return (
    <Link to={`/profile/${users.$id}`} className="user-card">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={users?.imageUrl}
        alt="creator-img"
      />
      <p className="text-xs font-bold text-center">{users?.name}</p>
      <p className="text-xs font-bold text-center">@{users?.username}</p>
      <Button type="button" className="shad-button_primary whitespace-nowrap">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
