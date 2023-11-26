import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetOtherUserProfile } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { user } = useUserContext();

  const id = user.id;

  const { data: currentProfile, isPending } = useGetOtherUserProfile(id || "");

  const savedPosts =
    currentProfile?.save?.length > 0 &&
    currentProfile?.save.map((item: Models.Document) => item.post);

  return (
    <div className="saved-container">
      <div className="flex flex-row gap-4">
        <img src="/assets/icons/save.svg" alt="edit" height={35} width={35} />
        <h2 className="h3-bold md:h2-bold">Saved posts</h2>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <GridPostList posts={savedPosts} showStats={false} showUser={false} />
      )}
    </div>
  );
};

export default Saved;
