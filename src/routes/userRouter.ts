import express from "express";
import Model from "../model/User";
import UserController from "../controllers/UserController";

const router = express.Router();

router.use(express.json());
router.post("/register", UserController.register);

export default router;
