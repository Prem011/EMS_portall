require("dotenv").config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "df9tr0qf8", 
    api_key: 753186948354322, 
    api_secret: "RSrZWWU-KTeBS9Vf2KTdBVbWKg8"
});

const uploadFile = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload(filePath, {
            timeout : 60000000000
        })
        console.log(result);
        return result;

    }
    catch(err){
        console.error(err);
        throw new Error('Failed to p upload file to Cloudinary');
    }
}

module.exports = {uploadFile};
