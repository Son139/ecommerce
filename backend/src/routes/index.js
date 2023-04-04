import express from "express";
import authRouter from "./auth";

// let router = express.Router();

const initAPIRoute = (app) => {
    // router.use("/auth", authRouter);

    // return app.use("api/v1/", router);
    app.use("api/v1/auth", authRouter);

    return app.use("/", (req, res) => {
        res.send("server on 2...");
    });
};

export default initAPIRoute;
