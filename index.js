import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// import routes
import productRoute from "./routes/productRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", productRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER IS RUNNING IN PORT ${process.env.APP_PORT}`);
  console.log(
    `Open http://localhost:${process.env.APP_PORT} to see the result`
  );
});
