const assetsConfig = cloudinary.config({
  cloud_name: proccess.env.CLOUDINARY_NAME,
  api_key: proccess.env.CLOUDINARY_KEY,
  api_secret: proccess.env.CLOUDINARY_SECRET,
})

export default assetsConfig
