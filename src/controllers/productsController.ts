import mongoose from 'mongoose';
import Product from '../model/Product';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

class ProductsController {
   newProduct(req: Request, res: Response) {  
    console.log(req.body);
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
      link: req.body.link,
      id: uuidv4()
    })

    newProduct.save((error) => {
      if (!error) res.status(200).send("Product registered.");
      else {
        console.log(error);
        res.status(400).send("Failed to register product.");
      }
    });
  } 

  async getAll(req: Request, res: Response) {
    const allProducts = await Product.find({})
    res.send(JSON.stringify(allProducts));
  }

  async selectProduct(req: Request, res: Response) {
    const productSelected = await Product.find({ id: req.header("id") })
    if (productSelected) {
      res.send(productSelected)
    }
  }

  async buy(req: Request, res: Response ) {

    const product = await Product.findOne({ id: req.body.id })
    await Product.updateOne({ id: req.body.id }, {
      inventory: product!.inventory - req.body.units
    });

    res.sendStatus(200)
  }
};

export default new ProductsController()