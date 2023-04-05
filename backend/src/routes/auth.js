import express, { Router } from "express";
import * as authController from "../controllers/auth";

const router = express.Router();

// router.get("/login", (req, res) => {
//     res.send("ok");
// });

router.post("/register", authController.register);

export default router;
