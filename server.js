const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send("Hello Node API")
})

app.get('/blog', (req, res) => {
    res.send("Hello Blog, My name is Hello World")
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
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