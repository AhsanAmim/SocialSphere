import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getFollowingUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT id, username, name, profilePic, coverPic FROM users WHERE id IN (SELECT followedUserId FROM relationships WHERE followerUserId = ? );";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  });
};
