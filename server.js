const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.get('/', (req, res) => {
    res.send("Hello Node API")
})

app.get('/blog', (req, res) => {
    res.send("Hello Blog, My name is Hello World")
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

// update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        //we cannot find product in database
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID: ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        //we cannot find product in database
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID: ${id}` })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


mongoose.connect('mongodb+srv://messinger8771:mess9599@nodeapi.msaskwh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPI')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log("Node API app is running on port 3000")
        })
    }).catch(() => {
        console.log('error');
    })