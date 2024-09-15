import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDENARY_NAME,
  api_key: process.env.CLOUDENARY_API_SECRET,
  api_secret: process.env.CLOUDENARY_API_KEY,
});

const uploadOnCloudnary = async (localFilPath) => {
  try {
    if (!localFilPath) return null;
    // upload the file on Cloudnary

    const response = await cloudinary.uploader.upload(localFilPath, {
      resource_type: 'auto',
    });

    // fille has been uploaded succefull

    console.log('File is Uploaded', response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilPath); // remove the local saved temploary fill

    return null;
  }
};




export {uploadOnCloudnary}