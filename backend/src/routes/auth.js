import express, { Router } from "express";

const router = express.Router();

router.get("/login", (req, res) => {
    res.send("ok");
});

export default router;
