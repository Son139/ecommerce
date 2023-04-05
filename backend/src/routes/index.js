import express from "express";
import authRouter from "./auth";

// let router = express.Router();

const initAPIRoute = (app) => {
    app.use("/api/v1/auth", authRouter);

    return app.use("/", (req, res) => {
        res.send("server on test 2...");
    });
};

export default initAPIRoute;
