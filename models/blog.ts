import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  snippet: string;
  body: string;
}

const blogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
