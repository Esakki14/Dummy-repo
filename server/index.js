const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/userModel');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/userData')
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
});

//get
app.get('/api/products', async(req,res)=>{
    try{
        const product = await Product.find({})
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})
//get id
app.get('/api/product/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
//add it
app.post('/api/products', async (req, res) => {
    try {
      console.log(req.body)
        const product = new Product(req.body);
        // console.log(product)
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update
app.put('/api/product/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const product = await Product.findByIdAndUpdate(id,req.body)

      if(!product){
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//delete
app.delete('/api/product/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const product = await Product.findByIdAndDelete(id);
      if(!product){
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json("Product delete successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


app.get('/', (req, res) => {
    res.send("Server is up and running!");
});

app.listen(4004, () => {
    console.log("🚀 Server is running on http://localhost:4004");
});
