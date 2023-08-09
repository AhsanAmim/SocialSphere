import "./rightBar.scss";
import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const RightBar = ({userId}) => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const { isLoading, isError, error, data } = useQuery(["followedlist"], async () => {
    try {
      const response = await makeRequest.get("/followedlist?userId="+userId);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching following users: " + error.message);
    }
  });

  useEffect(() => {
    if (data) {
      setFollowingUsers(data);
    }
  }, [data]);
  return (
    <div className="rightBar">
      <h2>Following Users</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <ul>
          {followingUsers.map((user) => (
            <li key={user.id}>
              <div className="container">
                <div className="item">                 
                  <span>
                    <Link
                      to={`/profile/${user.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      >
                      <span className="name">{user.username}</span>
                      </Link>
                   </span>
                    <div classname="coverpic"><img src={user.coverPic} width="300" height="200" /></div>
                    <div className="user">
                      <div className="userInfo">
                          <span className="name" ><b>{user.name}</b></span>
                      </div>
                    </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RightBar;
