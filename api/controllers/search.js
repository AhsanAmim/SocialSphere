import { db } from "../connect.js";
export const searchUsersByUsername = (req, res) => {
    const username = req.query.username;
    const q = `SELECT * FROM users WHERE username LIKE ?`;
    const value = "%" + username + "%";
  
    db.query(q, [value], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };