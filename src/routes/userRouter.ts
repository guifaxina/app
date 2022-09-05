import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.use(express.json());
router.post("/register", UserController.register);
router.post("/login", UserController.login)

export default router;
