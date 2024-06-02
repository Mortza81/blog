const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: ["true", "متن نظر را وارد نکردید"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: ["true", "نظر باید متعلق به یک کاربر باشد"],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: ["true", "نظر باید متعلق به یک پست باشد"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
commentSchema.pre(/^find/,function(next){
  this.populate({
    path:'user',
    select:'name photo'
  })
  next()
})
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
