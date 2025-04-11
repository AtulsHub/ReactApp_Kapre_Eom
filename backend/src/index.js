import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

console.log("Hello from the backend!");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(`Error connecting to the database: ${error.message}`);
  });
