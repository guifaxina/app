import express from "express";
import UserController from "../controllers/UserController";
import ProductsController from "../controllers/productsController";

const router = express.Router();

router.use(express.json());
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/user-data", UserController.returnUserData)
router.get("/select-product", ProductsController.selectProduct);
router.get("/get-products", ProductsController.getAll);

router.patch("/buy", ProductsController.buy);
export default router;
