import { useParams } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import ProfileCard from "@/components/shared/ProfileCard";
import Loader from "@/components/shared/Loader";

import { useGetOtherUserProfile } from "@/lib/react-query/queriesAndMutations";

const Profile = () => {
  const { id } = useParams();

  const { user } = useUserContext();

  const { data: currentProfile, isPending } = useGetOtherUserProfile(id || "");

  const isLoggedInUser: boolean = currentProfile?.$id === user.id;

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        {isPending ? (
          <Loader />
        ) : (
          currentProfile && (
            <ProfileCard
              currentProfile={currentProfile}
              isLoggedInUser={isLoggedInUser}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
