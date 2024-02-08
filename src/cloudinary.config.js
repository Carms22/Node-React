import {v2 as cloudinary} from 'cloudinary';
import dotenv  from 'dotenv';
import multer from 'multer';
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nodeReact',
    allowedFormats: ['jpg', 'png'],
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});
 
export const uploadCloud = multer({ storage });
 

