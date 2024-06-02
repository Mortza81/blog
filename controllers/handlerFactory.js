const catchAsync = require("../utils/catchAsync");
const apiFeatures = require("../utils/APIFeatures");
const { Model } = require("mongoose");
const appError = require("../utils/appErrors");
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.postId) {
      filter = { post: req.params.postId };
    }
    const features = new apiFeatures(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort();
    const doc = await features.query;
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: doc,
    });
  });
  exports.getOne = (Model, populateOptions) =>
    catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id)
      if (populateOptions) {
        query = query.populate(populateOptions)
      }
      const doc = await query
      res.status(200).json({
        status: 'success',
        data: doc,
      })
    })
  
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc=await Model.findByIdAndDelete(req.params.id);
    if(!doc) return next(new appError('کاربری با این آيدی وجود ندارد',404))
    res.status(200).json({
      status: "success",
      data: null,
    });
  });
