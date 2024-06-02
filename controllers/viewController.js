const catchAsync = require("../utils/catchAsync");
const User=require('../models/userModel')
const Post=require('../models/postModel')

exports.showAllPosts=catchAsync(async (req,res,next)=>{
    const posts=await Post.find().populate('writer')
    res.status(200).render('overview',{
        posts
    })
})
exports.showPost=catchAsync(async (req,res,next)=>{
    const post=await Post.findOne({slug:req.params.slug}).populate('comments')
    res.status(200).render('post',{
        post
    })
})
exports.login=catchAsync(async (req,res,next)=>{
    res.status(200).render('login')
})
exports.getAccount=catchAsync(async (req,res,next)=>{
    res.status(200).render('dashboard')
})
exports.showAllUsers=catchAsync(async (req,res,next)=>{
    const users=await User.find().select('+isActive')
    res.status(200).render('users',{
        users
    })
})
exports.register=catchAsync(async (req,res,next)=>{
    res.status(200).render('register')
})