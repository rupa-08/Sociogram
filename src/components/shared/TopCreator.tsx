import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import UserCard from "./UserCard";
import Loader from "./Loader";

const TopCreator = () => {
  const { data: topCreators, isPending: isLoadingUsers } = useGetUsers();

  return (
    <div className="home-creators">
      <h2 className="h3-bold lg:h2-bold ">Top Creators</h2>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <UserCard topCreators={topCreators?.documents} />
      )}
    </div>
  );
};

export default TopCreator;
