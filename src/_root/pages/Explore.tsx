import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import GridPostList from "@/components/shared/GridPostList";
import SearchedResults from "@/components/shared/SearchedResults";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";

const Explore = () => {
  const { ref, inView } = useInView();

  // for search
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  // for infinite posts
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full- h-full">
        <Loader />
      </div>
    );
  }

  const isSearched = searchValue !== "";
  const postList =
    !isSearched && posts.pages.every((item) => item.documents.length === 0);

  console.log(posts);

  return (
    <div className="explore-container mx-7 my-7">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={20}
            height={20}
          />
          <Input
            type="text"
            placeholder="search post"
            className="explore-search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
      </div>

      <div className="w-full flex-between max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-x px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isSearched ? (
          <SearchedResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : postList ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
