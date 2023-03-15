import cloudinary from 'cloudinary';

export const generateCloudinaryUrl = async (image, index, height) => {
    // Configuration 
    cloudinary.v2.config({
        cloud_name: import.meta.env.CLOUD_NAME,
        api_key: import.meta.env.CLOUDINARY_API_KEY,
        api_secret: import.meta.env.CLOUDINARY_SEC_KEY
    });
    const res = cloudinary.v2.uploader.upload(image.url, {public_id: image.id})
    res.then((data) => {
    }).catch((err) => {
    console.log(err);
    });


    // Generate 
    const url = cloudinary.v2.url(image.id, {
    height: height,
    Crop: 'crop',
    format: 'webp'
    });
    let loading = index % 3 == 0 && index >= 10 ? 'lazy' : 'eager';
    const string = `<img alt="nature photo" height='500' width='500' format="webp" position="attention" loading="${loading}" class="rounded-lg h-full w-full object-cover" src="${url}"></img>`;
    return string;
}
