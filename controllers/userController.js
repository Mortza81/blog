const User = require("../models/userModel");
const multer=require('multer')
const appError = require("../utils/appErrors");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const multerStorage=multer.memoryStorage()
const multerFilter=(req,file,cb)=>{
  if(file.mimetype.split('/')[0].startsWith('image')){
    cb(null,true)
  }else(
    cb(new appError('فرمت فایل صحیح نیست!',400).false)
  )
}
const upload=multer({
  storage:multerStorage,
  fileFilter:multerFilter
})
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  
  // تنظیم نام فایل جدید
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // استفاده از sharp برای تغییر اندازه و ذخیره تصویر
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});
exports.uploadUserPhoto=upload.single('photo')
const filterObj = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).map((el) => {
    if (fields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.deleteUser = factory.deleteOne(User)
// the below route is for admin use
// do not update password with this, cause pre save middlewares not going to work
exports.updateUser = factory.updateOne(User)
exports.getOneUser=factory.getOne(User,{path:'comments'})
exports.getAllUsers = factory.getAll(User)
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    isActive: false,
  });
  res.status(200).json({
    status: "success",
    data: null,
  });
  
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new appError("این مسیر برای آپدیت پسوورد نیست", 201));
  }
  const updateFields = filterObj(req.body, "email", "name");
  if (req.file) {
    updateFields.photo = req.file.filename;
  }
  const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    user,
  });
});
