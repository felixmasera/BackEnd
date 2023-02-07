import {promises as fs} from "fs";
const ruta = "./DataBase.json";

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.addId()
    }

    static addId(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async (product) => {
        //Validar que todos los campos sean completados que la propiedad "code" no esté repetida.
        const read = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(read);
        const prodCode = data.map((prod) => prod.code);
        const prodExist = prodCode.includes(product.code); 
        if (prodExist) {
            return console.log (`El código ${product.code} ya existe. Ingrese uno diferente.`)
        } else if (Object.values(product).includes("") || Object.values(product).includes(null)) {
            return console.log("Todos los campos deben ser completados.");
        } else {
            const nuevoProducto = {...product};
            data.push(nuevoProducto);
            await fs.writeFile(this.path, JSON.stringify(data), 'utf-8')
            //console.log(data)
            return console.log(`El producto con id: ${nuevoProducto.id} ha sido agregado.`)
        }
    }

    getProducts = async () => {
        const read = await fs.readFile(this.path, 'utf-8')
        const data = JSON.parse(read)
        if (data.length != 0) {
            return data
        } else {
            return ("No se encuentran productos en el listado.")
        }
    }

    getProductById = async (id) => {
        const read = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(read);
        const findProduct = data.find((prod) => prod.id === id);
        if (findProduct) {
            return findProduct
        } else {
            return ("Product Not found")
        }
    }

    deleteProduct = async (id) => {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const productoEliminado = JSON.stringify(
        data.find((product) => product.id === id)
        );
        const newData = data.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
        return `El producto ${productoEliminado} ha sido eliminado exitosamente`
    }

    updateProduct = async (id, entry, value) => {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const index = data.findIndex((product) => product.id === id);
            if(!data[index][entry]){
                return console.log("El producto no pudo ser actualizado.")
            } else {
                data[index][entry] = value;
                await fs.writeFile(this.path, JSON.stringify(data, null, 2));
                console.log("El producto se ha modificado de la siguiente manera:")
                return console.log(data[index]);
            }
            
    }
}


//TESTING
//Instanciamos productManager.
const productManager = new ProductManager(ruta); 

// Creamos productos.
const product1 = new Product("iPhone 11 Pro Max", "128GB", 600, "img: not found", "iph785", 20);
const product2 = new Product("iPhone 12 Pro Max", "256GB", 900, "img: not found", "iph789", 180);
const product3 = new Product("iPhone 13 Pro Max", "128GB", 1000, "img: not found", "iph435", 100);
const product4 = new Product("iPhone 14 Pro Max", "512GB", 1400, "img: not found", "iph567", 200);

// Definimos función de testing.

const test = async() => {
    //Creamos archivo JSON.
    await fs.writeFile(ruta, "[]");

    // Listamos array de productos, que debería estar vacío.

    await productManager.getProducts(); 
    // Agregamos los productos.

    await productManager.addProduct(product1);
    await productManager.addProduct(product2);
    await productManager.addProduct(product3);
    await productManager.addProduct(product4);

    // Listamos nuevamente el array de productos, ahora con los mismos cargados.
    await productManager.getProducts(); 

    // Buscamos dos productos por ID. Uno está presente; el otro no.
    await productManager.getProductById(2);
    await productManager.getProductById(5);

    // Actualizamos una o varias propiedades de un producto.
   /*  await productManager.updateProduct(1, "stock", 10);
    await productManager.updateProduct(1, "price", 110000); */

    // Listamos nuevamente los productos.
    await productManager.getProducts();

    // Eliminamos un producto.
    await productManager.deleteProduct(4);
    
    // Listamos nuevamente los productos.
    await productManager.getProducts();

}

export default ProductManager 