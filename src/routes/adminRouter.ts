import express from "express";

// Controllers
import auth from "../controllers/authController";
import ProductsController from "../controllers/productsController";

const router = express.Router();

router.use(express.json());
// router.use(auth)

router.post("/add-new-product", auth, ProductsController.newProduct);

router.delete('/delete-product/:id', auth, ProductsController.deleteProduct)  

export default router