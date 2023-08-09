import express from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const router = express.Router();

// Initialize Cloudinary
cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_KEY,
  api_secret:process.env.CLOUDINARY_SECRET,
});

// Initialize Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads", 
    format: async (req, file) => "png",
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    const imageUrl = req.file.path;
    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({ error: "Cloudinary Upload Error" });
  }
});

export default router;