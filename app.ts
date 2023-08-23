import { Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import express from "express";

import Blog from "./models/blog";
import blogRoutes from "./routes/blogRoutes";
const app = express();

const dbURI: string =
  "mongodb+srv://username:password@dbname.wkjhon1.mongodb.net/tables?retryWrites=true&w=majority";

console.log("//// MVC - Mongo Blog App //// by Berkay Gediz");
console.log("- Importing modules...");
mongoose
  .connect(dbURI)
  .then(() =>
    app.listen(3000, () => console.log("- Server is running on port 3000"))
  )
  .catch((error_db) =>
    console.error("(!) Database connection error: ", error_db.substring(0, 150))
  );

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/blogs", blogRoutes);
app.get("/", (req: Request, res: Response) => res.redirect("/blogs"));
app.get("/about", (req: Request, res: Response) =>
  res.render("about", { title: "About" })
);
app.use((req: Request, res: Response) =>
  res.status(404).render("error", { title: "404", message: "Not Found" })
);

export default app;
