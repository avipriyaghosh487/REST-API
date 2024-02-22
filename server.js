const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Product = require('./models/productModel')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
    res.send('Node API is running')
})

app.get('/products', async (req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})

app.get('/products/:id', async (req,res) => {
    try {
        const {id} =req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})


app.post('/products', async (req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})

app.put('/products/:id', async (req,res) => {
    try {
        const {id} =req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({
                message:`Cannot find any product with id:${id}` 
            })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})

app.delete('/products/:id', async (req,res) => {
    try {
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                message:`Cannot find any product with id:${id}` 
            })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})



mongoose
.connect('mongodb+srv://aceghosh487:12345@avipriyaapi.rvil1g3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=AvipriyaAPI')
.then(() => {
    console.log('Connected to MongoDB...');
    app.listen(3000, () => {
        console.log('Node API is running on port 3000...')
    })
}).catch((error) => {
    console.log(error);
})