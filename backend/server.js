import express from "express";
import dotenv  from "dotenv";  // for db credentials, API keys and other secrets and not checked on the version control.
import path from "path"
import { connectDB } from "./config/db.js"; // to connect with mongoDB
import productRoutes from "./Routes/product.route.js" // our products routes

dotenv.config({path: "../.env"});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/products", productRoutes); // api for the products
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
app.listen(PORT, () => {
  connectDB(process.env.MONGO_URI); // imported from the db.
  console.log("server started at http://localhost:" + PORT);
});
