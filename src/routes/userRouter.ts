import express from "express";
import UserController from "../controllers/userController";
import ProductsController from "../controllers/productsController"

const router = express.Router();

router.use(express.json());
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/get-products", ProductsController.getAll)


export default router;


