import express from 'express'
import ProductManager from "./ProductManager.js";

const app = express()
const PORT = 4000
const manager = new ProductManager("./src/DataBase.json");



app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Creando mi primer servidor express")
});


app.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.send(data);
}); 


app.get("/products/:pid", async (req, res) => {
    const product = await manager.getProductById(parseInt(req.params.pid));
    product === null ? res.send("Producto no encontrado") : res.send(product);
});


app.listen(PORT, ()=>{
    console.log(`Server en puerto numero: ${PORT}`)  
}) ;