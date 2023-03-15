import cloudinary from 'cloudinary';

export const retrieveUrl = (image) => {
    // Configuration 
    cloudinary.v2.config({
        cloud_name: import.meta.env.CLOUD_NAME,
        api_key: import.meta.env.CLOUDINARY_API_KEY,
        api_secret: import.meta.env.CLOUDINARY_SEC_KEY
    });

    // Generate 
    const url = cloudinary.v2.url(image.id, {
    format: 'webp'
    });
    return url;
}
