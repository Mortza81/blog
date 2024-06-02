const mongoose = require("mongoose");
const slugify=require('slugify')
const postSchema = new mongoose.Schema({
  imageCover:{
    type:String,
    required:[true,'پست حتما باید تصویری داشته باشد']
  },
  slug:{
    type:String
  },
  body: {
    type: String,
    required: [true, "شما باید متنی را وارد کنید"],
    maxLength: [1000, "شما به حداکثر تعداد حروف رسیدید"],
  },
  title: {
    required: [true, "شما باید موضوعی وارد کنید"],
    type: String,
    unique: true,
    maxLength: [100, "شما به حداکثر تعداد حروف رسیدید"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  writer:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
postSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id',
})
postSchema.pre('save',function(next){
  this.slug=slugify(this.title)
  next()
})
postSchema.pre(/^find/,function(next){
  this.populate({
    path:'writer',
    select:'name id photo'
  })
  next()
})
const Post = mongoose.model("Post", postSchema);
module.exports = Post;