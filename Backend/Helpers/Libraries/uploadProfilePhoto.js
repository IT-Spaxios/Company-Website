import cloudinary from "./cloudinary.js";

export const uploadProfilePhoto = async (fileBuffer) => {
    if (!fileBuffer) return null;

    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "profilePhotos" },
            (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(fileBuffer);
    });

    return result.secure_url;
};
