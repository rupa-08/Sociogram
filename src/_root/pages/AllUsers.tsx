/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";

import {
  useGetInfiniteUsers,
  // useGetUsers,
} from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { ref, inView } = useInView();
  // const { data: allUsers, isPending: isLoadingUsers } = useGetUsers();

  const { data: users, fetchNextPage, hasNextPage } = useGetInfiniteUsers();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex gap-2 mb-7">
        <img alt="users-icon" src="/assets/icons/people.svg" />
        <h2 className="h3-bold lg:h2-bold ">All Users</h2>
      </div>

      <div className="user-grid">
        {users?.pages?.map((item: any, index) => (
          <UserCard key={`page-${index}`} users={item?.documents} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
