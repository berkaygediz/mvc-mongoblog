import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

const blog_index = async (req: Request, res: Response) => {
  try {
    delay(350);
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blogs/index", { title: "All Blogs", blogs });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { title: "500", message: "Internal Server Error" });
  }
};

const blog_details = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    delay(350);
    const blog = await Blog.findById(id);
    if (blog) {
      res.render("blogs/details", { title: blog.title.substring(0, 50), blog });
      console.log("Activity: ", blog.title);
    } else {
      res.status(400).render("error", { title: "404", message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { title: "500", message: "Internal Server Error" });
  }
};

const blog_create_get = (req: Request, res: Response) => {
  try {
    delay(350);
    res.render("blogs/create", { title: "Create a new blog" });
    console.log("Activity: Create a new blog");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { title: "500", message: "Internal Server Error" });
  }
};

const blog_create_post = async (req: Request, res: Response) => {
  const blog = new Blog(req.body);

  try {
    delay(350);
    await blog.save();
    res.redirect("/blogs");
    console.log("Created new blog: ", blog.title, " with id: ", blog._id);
  } catch (error) {
    console.error(error);
    res.status(400).render("error", { title: "400", message: "Bad Request" });
  }
};

const blog_delete = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    delay(350);
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: "/blogs" });
    console.log("Deleted blog with id: ", id);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { title: "500", message: "Internal Server Error" });
  }
};

const blog_search = async (req: Request, res: Response) => {
  try {
    delay(350);
    const searchTerm = req.query.q as string;
    const blogs = await Blog.find({
      $or: [{ title: { $regex: searchTerm, $options: "i" } }],
    }).sort({ createdAt: -1 });
    console.log("Search results for: ", searchTerm);
    res.render("blogs/searchResults", {
      title: "Search Results",
      blogs,
      searchTerm,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { title: "500", message: "Internal Server Error" });
  }
};

export {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_search,
};
