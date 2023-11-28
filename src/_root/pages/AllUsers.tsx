import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetInfiniteUsers,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: allUsers, isPending: isLoadingUsers } = useGetUsers();

  const { user } = useUserContext();
  const { data: users, fetchNextPage, hasNextPage } = useGetInfiniteUsers();

  console.log(users);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex gap-2 mb-7">
        <img alt="users-icon" src="/assets/icons/people.svg" />
        <h2 className="h3-bold lg:h2-bold ">All Users</h2>
      </div>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        // <div className="user-grid">
        //   {allUsers?.documents
        //     ?.filter((currentUser) => currentUser?.$id !== user?.id)
        //     .map((user) => (
        //       <UserCard users={user} />
        //     ))}
        // </div>

        <div className="user-grid">
          {users?.pages?.map((item, index) => (
            <UserCard key={`page-${index}`} users={item?.documents} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
