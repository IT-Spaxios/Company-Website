import cloudinary from "./cloudinary.js"; // adjust path according to your project

export const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return;

  try {
    const parts = imageUrl.split("/"); // safe
    const filename = parts[parts.length - 1]; // e.g., abc123.png
    const publicId = `stories/${filename.split(".")[0]}`; // folder + filename without extension
    await cloudinary.uploader.destroy(publicId);
    console.log("Deleted Cloudinary image:", publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};
