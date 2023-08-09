import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../logout/LogoutButton";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    makeRequest.get(`/search/searchUsersByUsername?username=${searchQuery}`).then((res) => {
      setSearchResults(res.data);
    });
  };
  
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocialSphere</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div>
      <div className="search-container">
      <h2>User Search</h2>
      <div className="search-input">
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Search</button>
      <div ref={searchResultsRef} className="search-results">
      {searchResults.map((user) => (
        <div key={user.id}>
          <span><Link
                to={`/profile/${user.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => setSearchResults([])}
              >
                <span className="name">{user.username}</span>
              </Link>
              </span>
        </div>
      ))}
      </div>
      </div>
    </div>
    </div>
      </div>
      <div className="right">
        <LogoutButton />
        <div className="user">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <div className="details">
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{currentUser.username}</span>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
