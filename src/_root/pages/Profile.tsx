import { useParams } from "react-router-dom";
import { useGetOtherUserProfile } from "@/lib/react-query/queriesAndMutations";
import ProfileCard from "@/components/shared/ProfileCard";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";

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
          <ProfileCard
            currentProfile={currentProfile}
            isLoggedInUser={isLoggedInUser}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
