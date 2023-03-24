const express = require("express");
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//get all users
const getAllUsers = asyncHandler(async (req,res) =>{
    let users = await User.find();
    if(!users){
        res.status(400)
        throw new Error("No users Found");
    }
    res.status(200).json({users});  
});

//sinup request
const signup = asyncHandler(async (req,res) =>{
    const {name, email, password} = req.body;
    let userAvailable = await User.findOne({email});
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All Fields are mendatory");
    }

    if(userAvailable){
        res.status(400);
        throw new Error("User Already exists ! Login Instead");
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        blogs: []
    });
    res.status(201).json({user});
});

// login
const login = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mendatory");
    }

    const userAvailable = await User.findOne({email});
    if(!userAvailable){
        res.status(404);
        throw new Error("Couldn't Find the user by this Email ID");
    }

    const isPasswordCorrect = await bcrypt.compare(password,userAvailable.password);
    if(!isPasswordCorrect){
        res.status(400);
        throw new Error("Incorrect Password");
    }
    res.status(200).json({message: "Login Successfull"});

})

module.exports = {getAllUsers,signup,login};