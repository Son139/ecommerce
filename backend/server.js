import express from "express";
import cors from "cors";
import initAPIRoute from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";

require("dotenv").config;

const app = express();
const port = process.env.PORT || 8080;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "  POST", " PUT", " DELETE"],
    }),
);

// CẤU HÌNH CHO APP đọc đc dữ liệu client gửi lên
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//init api route
initAPIRoute(app);

// connect mysql server
connectDatabase();

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
