import { Link } from "react-router-dom";
import { Models } from "appwrite";

import { Button } from "../ui/button";

type UserCardProps = {
  users: Models.Document;
};
const UserCard = ({ users }: UserCardProps) => {
  return (
    <>
      {users?.map((user: Models.Document) => (
        <Link to={`/profile/${user.$id}`} className="user-card">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={user?.imageUrl}
            alt="creator-img"
          />
          <p className="text-xs font-bold text-center">{user?.name}</p>
          <p className="text-xs font-bold text-center">@{user?.username}</p>
          <Button
            type="button"
            className="shad-button_primary whitespace-nowrap"
          >
            View
          </Button>
        </Link>
      ))}
    </>
  );
};

export default UserCard;
