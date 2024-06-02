const catchAsync = require("../utils/catchAsync");
const Post = require("../models/postModel");
const factory = require("./handlerFactory");
const apiFeatures = require("../utils/APIFeatures");
const sharp = require("sharp");
const multer = require("multer");
const appError = require("../utils/appErrors");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0].startsWith("image")) {
    cb(null, true);
  } else cb(new appError("فرمت فایل صحیح نیست!", 400).false);
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadImageCoverPost = upload.single("imageCover");
exports.resizeImageCover = catchAsync(async (req, res, next) => {
  if (!req.file) next();
  req.body.imageCover = `post-${req.params.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/posts/${req.body.imageCover}`);
    next()
});
exports.checkId = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new appError("چنین پستی وجود ندارد"));
  }
  next();
});
exports.setWriter = (req, res, next) => {
  req.body.writer = req.user.id;
  next();
};
exports.getAllPosts = factory.getAll(Post);
exports.getOnePost = factory.getOne(Post, "comments");
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
exports.createPost = factory.createOne(Post);
