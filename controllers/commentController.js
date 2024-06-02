const Comment = require("../models/commentModel");
const appError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
exports.setUserIdAndPostId = (req, res, next) => {
  if(!req.body.user) req.body.user=req.user.id
  if(!req.body.post) req.body.post=req.params.tourId
    next()
};
exports.getOneComment = factory.getOne(Comment);
exports.getAllComments = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.deleteMyComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (comment.user != req.user.id) {
    return next(new appError("این کامنت متعلق به شما نیست",400));
  }
  await comment.deleteOne();
  res.status(201).json({
    status: "success",
    data: null,
  });
});
