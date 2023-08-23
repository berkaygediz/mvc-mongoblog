import express from "express";
import * as blogController from "../controllers/blogController";

const router = express.Router();

router.get("/searchResults", blogController.blog_search);
router.get("/", blogController.blog_index);
router.get("/create", blogController.blog_create_get);
router.post("/", blogController.blog_create_post);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);

export default router;
