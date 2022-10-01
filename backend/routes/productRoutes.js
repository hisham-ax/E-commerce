import express from 'express';
import Product from '../models/ProductModel.js';

const proudctRouter = express.Router();

proudctRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

proudctRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
proudctRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
export default proudctRouter;
