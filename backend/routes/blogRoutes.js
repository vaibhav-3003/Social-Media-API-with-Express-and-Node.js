const express = require('express');
const router = express.Router();
const {getAllBlogs, addBlog,updateBlog,getBlogById,deleteBlogById} = require('../controllers/blogController');

router.get("/",getAllBlogs);

router.post("/add",addBlog);

router.put("/update/:id", updateBlog);

router.get("/:id",getBlogById);

router.delete("/:id",deleteBlogById);

module.exports = router;