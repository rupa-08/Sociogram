import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import UserCard from "./UserCard";
import Loader from "./Loader";
import { useUserContext } from "@/context/AuthContext";

const TopCreator = () => {
  const { data: topUsers, isPending: isLoadingUsers } = useGetUsers(10);

  const { user } = useUserContext();

  return (
    <div className="home-creators w-full">
      <h2 className="h3-bold lg:h2-bold ">Top Creators</h2>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {topUsers?.documents
            ?.filter((users) => users?.$id !== user?.id)
            ?.map((users) => {
              return <UserCard users={users} />;
            })}
        </div>
      )}
    </div>
  );
};

export default TopCreator;
