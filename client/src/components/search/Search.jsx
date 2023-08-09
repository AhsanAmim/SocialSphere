import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    makeRequest.get(`/search/searchUsersByUsername?username=${searchQuery}`).then((res) => {
      setSearchResults(res.data);
    });
  };

  return (
    <div>
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((user) => (
        <div key={user.id}>
          <span><Link
                to={`/profile/${user.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{user.username}</span>
              </Link>
              </span>
        </div>
      ))}
    </div>
  );
};

export default Search;