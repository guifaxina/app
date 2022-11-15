import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

// Models
import Product from '../model/Product';

class ProductsController {
  async createProduct(req: Request, res: Response) {
    try {
      const createdProduct = await Product.create({
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
        link: req.body.link,
        id: uuidv4()
      })

      if (createdProduct) res.status(201).json({ status: "success", message: "product registered", data: createdProduct })
      else res.status(400).json({ status: "error", message: "failed to register product. check if there is information missing." });
    } catch (error: any) {
      console.error({
        request_ip: req.ip,
        request_http_version: req.httpVersion,
        request_url: req.url,
        error: {
          error_message: error.message,
          error_stack: error.stack,
        }
      });
      res.status(404).json({
        status: "error", message: "failed to register product."
      });
    }
  }

  async getAllProducts(_: Request, res: Response) {
    const allProducts = await Product.find()
    res.send(JSON.stringify(allProducts));
  }

  async selectProduct(req: Request, res: Response) {
    const productSelected = await Product.find({ id: req.header("id") })
    if (productSelected) {
      res.send(productSelected)
    }
  }

  async buyProduct(req: Request, res: Response) {
    const product = await Product.findOne({ id: req.body.id })
    await Product.updateOne({ id: req.body.id }, {
      inventory: product!.inventory - req.body.units
    });
    res.status(200).json({ status: "success", message: "Product bought with success." })
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const product = await Product.find({ id: req.params.id })
      const deleteResponse = await Product.deleteOne({ id: req.params.id });

      if (deleteResponse.deletedCount == 1)
        res.status(200).json({ status: "success", message: "Product deleted.", data: product });

      else res.status(400).json({ status: "failed", message: "Could not delete the product." });

    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "error", message: "Uh oh, something went wrong!" })
    }
  }
};

export default new ProductsController()