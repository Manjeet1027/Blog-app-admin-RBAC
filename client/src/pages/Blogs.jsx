import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mui/material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all-blog");
      console.log("Blogs Data : ", { data });
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
    {isLogin ? (
      <Grid container spacing={2}>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userRole") === "admin" }
            title={blog?.title}
            content={blog?.content}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </Grid>
    ) : (navigate("/login"))}
    </>
  );
};

export default Blogs;