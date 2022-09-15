import express from "express";
import auth from "../controllers/authController"
import jwt from 'jsonwebtoken'
import Product from '../model/Product'
import ProductsController from "../controllers/productsController";

const router = express.Router();

router.use(express.json());
// router.use(auth)

router.post("/add-new-product", auth, ProductsController.newProduct)
router.delete('/delete-product/:id', auth, async (req, res) => {
    await Product.deleteOne({ id: req.params.id })
    res.send('Deleted')
})


export default router