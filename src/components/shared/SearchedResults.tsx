import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchedResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchedResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchedResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }

  console.log("posts", searchedPosts);

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No result found.</p>
  );
};

export default SearchedResults;
