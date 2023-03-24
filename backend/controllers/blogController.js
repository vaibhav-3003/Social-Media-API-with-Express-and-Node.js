const Blog = require('../models/blogSchema');
const asyncHandler = require('express-async-handler');
const User = require("../models/userSchema");
const mongoose = require("mongoose");

//get all blogs
const getAllBlogs = asyncHandler(async(req,res)=>{
    let blogs = await Blog.find();
    if(!blogs){
        res.status(404);
        throw new Error("No blogs found");
    }
    res.status(200).json({blogs});
});

// create new blog
const addBlog = asyncHandler(async(req,res)=>{
    const {title, description, image,user} = req.body;

    if(!title || !description || !user){
        res.status(400);
        throw new Error("All Fields are mendatory");
    }
    let existingUser;
    
    try{
        existingUser = await User.findById(mongoose.Types.ObjectId(user));
    }catch(err){
        console.log(err);
    }

    if(!existingUser){
        res.status(404);
        throw new Error("Unable to find user by this id");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    const blog = await Blog.create({
        title,
        description,
        image,
        user
    });
    existingUser.blogs.push(blog);
    await existingUser.save({session});

    await session.commitTransaction();
    
    res.status(201).json({blog});
});

//update the blog
const updateBlog = asyncHandler(async (req,res)=>{
    const {title,description,image} = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,{
        title,
        description,
        image
    });
    if(!updatedBlog){
        res.status(500);
        throw new Error("Unable to update the blog");
    }
    res.status(200).json({message: "Blog is updated."});
});

const getBlogById = asyncHandler(async (req,res)=>{
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(404);
        throw new Error("No blog found with this Id");
    }
    res.status(200).json({blog});
});

//delete the blog with given id
const deleteBlogById = asyncHandler(async (req,res)=>{
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if(!blog){
        res.status(500);
        throw new Error("Unable to delete the blog");
    }

    res.status(200).json({message: `The blog named ${blog.title} is successfully deleted`});
});

module.exports = {getAllBlogs, addBlog,updateBlog,getBlogById,deleteBlogById};