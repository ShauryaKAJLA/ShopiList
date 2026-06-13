import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import ApiError from './ApiError.util.js'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadONCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null;
        //upload file on cloudinary
        console.log(localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto"
            }
        )
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        //removes the temporary saved file as the upload got failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadONCloudinary }