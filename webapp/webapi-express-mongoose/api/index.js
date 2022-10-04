const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/example', { useNewUrlParser: true })
const port = 3000
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Work!' });
})
app.post('/products', async (req, res) => {
    const payload = req.body;
    const product = new Product(payload);
    await product.save();
    res.status(201).end();
});
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
});
app.get('/products_50up', async (req, res) => {
    const filter = { price: { $gte: 50 } }
    let products = await Product.aggregate([
        { $match: filter }
    ]);
    res.json(products);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
