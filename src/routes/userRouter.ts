import express from "express";

// Controllers
import UserController from "../controllers/UserController";
import ProductsController from "../controllers/productsController";

const router = express.Router();

router.use(express.json());

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/user-data", UserController.returnUserData)
router.get("/select-product", ProductsController.selectProduct);
router.get("/get-products", ProductsController.getAllProducts);

router.patch("/buy", ProductsController.buyProduct);

export default router;
