
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../postsSlice";
import { useState } from "react";

const SearchPosts = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="py-4 mb-4">
      <input
        type="text"
        placeholder="Search posts"
        value={query}
        onChange={handleSearchChange} // Handle input changes
        className="w-full p-2 border"
      />
    </div>
  );
};

export default SearchPosts;
