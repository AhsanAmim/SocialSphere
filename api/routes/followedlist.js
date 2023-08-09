import express from "express";
import { getFollowingUsers } from "../controllers/followedlist.js";

const router = express.Router();

router.get("/", getFollowingUsers);

export default router;

