import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import type { Fields, Files } from "formidable";

import dbConnect from "../../lib/db";
import { Video } from "../../models/Video";
import { Movie } from "../../models/Movie";
import { Image } from "../../models/Image";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Cloudinary Config Loaded ✅");

    const form = formidable({ multiples: true });

    const [fields, files] = await new Promise<[Fields, Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.log("Error parsing form:", err);
            return reject(err);
          }
          resolve([fields, files]);
        });
      }
    );

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    if (
      !fields.movieId ||
      !Array.isArray(fields.movieId) ||
      fields.movieId.length === 0
    ) {
      return res.status(400).json({ error: "No movie ID provided" });
    }

    const movieIdStr = fields.movieId[0];

    let movieId: string;
    try {
      const movieData = JSON.parse(movieIdStr);
      movieId = movieData.id;
    } catch (err) {
      console.log(err, "error");
      movieId = movieIdStr;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID format" });
    }

    const videoFile = files.video?.[0];
    if (!videoFile) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    let videoResult;
    try {
      videoResult = await cloudinary.v2.uploader.upload(videoFile.filepath, {
        resource_type: "video",
        folder: "videos",
      });
      console.log("Uploaded video URL:", videoResult.secure_url);
    } catch (cloudinaryError) {
      console.error("Cloudinary video upload error:", cloudinaryError);
      return res
        .status(500)
        .json({ error: "Error uploading video to Cloudinary" });
    }

    let imageUrl = null;
    const imageFile = files.image?.[0];
    if (imageFile) {
      try {
        const imageResult = await cloudinary.v2.uploader.upload(
          imageFile.filepath,
          {
            resource_type: "image",
            folder: "thumbnails",
          }
        );
        imageUrl = imageResult.secure_url;
        console.log("Uploaded image URL:", imageUrl);
      } catch (cloudinaryError) {
        console.error("Cloudinary image upload error:", cloudinaryError);
        return res
          .status(500)
          .json({ error: "Error uploading image to Cloudinary" });
      }
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(400).json({ error: "Movie not found" });
    }

    const videoDoc = new Video({ movieId, videoUrl: videoResult.secure_url });
    await videoDoc.save();

    if (imageUrl) {
      const imageDoc = new Image({ movieId, imageUrl });
      await imageDoc.save();
    }

    return res.status(200).json({
      message: "Upload successful!",
      videoUrl: videoResult.secure_url,
      imageUrl: imageUrl || null,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default uploadVideo;
