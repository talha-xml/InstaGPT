
const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = async (filePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
        folder: 'instagpt/media'
    });

    return {
        mediaUrl: result.secure_url,
        publicId: result.public_id,
        mediaType: result.resource_type
    };
};

module.exports = uploadToCloudinary;
