/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchedResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchedResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchedResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No result found.</p>
  );
};

export default SearchedResults;
