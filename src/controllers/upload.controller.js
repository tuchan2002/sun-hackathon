const fs = require("fs");
const path = require("path");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadController = {
  uploadImages: async (req, res, next) => {
    try {
      if (!req.files) {
        const err = new Error("No image providd.");
        err.statusCode = 500;
        throw err;
      }

      const multipleImage = req.files.map((file) => {
        return cloudinary.v2.uploader.upload(file.path, {
          folder: "res/images",
        });
      });

      const imagesSaved = await Promise.all(multipleImage);

      req.files.forEach((file) => {
        clearImage(file.path);
      });

      return res.json({
        message: "Upload image success.",
        success: true,
        images: imagesSaved.map((val) => {
          return {
            public_id: val.public_id,
            secure_url: val.secure_url,
          };
        }),
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  destroyImages: async (req, res, next) => {
    const { imageUrls } = req.body;

    console.log("hello");

    try {
      if (imageUrls.length === 0) {
        const err = new Error("No image selected.");
        err.statusCode = 500;
        throw err;
      }
      const multipleImageRm = imageUrls.map((public_id) => {
        return cloudinary.v2.uploader.destroy(public_id);
      });

      const imagesRemoved = await Promise.all(multipleImageRm);

      res.status(202).json({
        message: "Delete images success.",
        success: true,
        data: imagesRemoved,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", "..", filePath);
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
};

module.exports = uploadController;
