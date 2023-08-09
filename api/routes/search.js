import express from "express";
import {
    searchUsersByUsername,
} from "../controllers/search.js";

const router = express.Router();

router.get("/searchUsersByUsername", searchUsersByUsername);

export default router;