import { Models } from "appwrite";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";

type TopCreatorProps = {
  topCreators?: Models.Document | undefined;
};

const UserCard = ({ topCreators }: TopCreatorProps) => {
  const { user } = useUserContext();

  return (
    <div className="grid grid-cols-2 gap-2">
      {topCreators
        ?.filter((creator: Models.Document) => creator?.$id !== user?.id)
        ?.map((creator: Models.Document) => {
          return (
            <div className="user-card">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={creator?.imageUrl}
                alt="creator-img"
              />
              <p className="text-xs font-bold text-center">{creator?.name}</p>
              <Button
                type="button"
                className="shad-button_primary whitespace-nowrap"
              >
                Follow
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default UserCard;
