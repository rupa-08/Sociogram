import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { data: allUsers, isPending: isLoadingUsers } = useGetUsers();

  const { user } = useUserContext();
  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex gap-2 mb-7">
        <img alt="users-icon" src="/assets/icons/people.svg" />
        <h2 className="h3-bold lg:h2-bold ">All Users</h2>
      </div>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className="user-grid">
          {allUsers?.documents
            ?.filter((currentUser) => currentUser?.$id !== user?.id)
            .map((user) => (
              <UserCard users={user} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
