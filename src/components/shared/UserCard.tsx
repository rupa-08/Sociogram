/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

import { Models } from "appwrite";

import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";

// type UserCardProps = {
//   users: Models.Document;
// };
const UserCard = ({ users }: any) => {
  const { user } = useUserContext();

  return (
    <>
      {users?.length > 0 ? (
        users
          ?.filter((item: Models.Document) => item?.$id !== user?.id)
          .map((item: Models.Document) => (
            <Link to={`/profile/${item.$id}`} className="user-card">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item?.imageUrl}
                alt="creator-img"
              />
              <p className="text-xs font-bold text-center">{item?.name}</p>
              <p className="text-xs font-bold text-center">@{item?.username}</p>
              <Button
                type="button"
                className="shad-button_primary whitespace-nowrap"
              >
                View
              </Button>
            </Link>
          ))
      ) : (
        <>
          {users?.length > 0 && (
            <Link to={`/profile/${users.$id}`} className="user-card">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={users?.imageUrl}
                alt="creator-img"
              />
              <p className="text-xs font-bold text-center">{users?.name}</p>
              <p className="text-xs font-bold text-center">
                @{users?.username}
              </p>
              <Button
                type="button"
                className="shad-button_primary whitespace-nowrap"
              >
                View
              </Button>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default UserCard;
