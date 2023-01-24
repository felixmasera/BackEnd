class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct(newProduct){
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)){
            console.log("Pleas complete all Fields")
        }
        else{
            const repeatedCode = this.products.find((codeProd)=> codeProd.code === newProduct.code)
            if (repeatedCode){
                console.log("This code " + newProduct.code + "already exits")
            }
            else{
                this.products.push({...newProduct, id: this.products.length + 1})
                    console.log("This product has been added succesfully")
            }

        }

    }

    getProduct(){
        console.log("Products:")
        console.log(this.products)
        return this.products
    }

    getProductById(id){
        let searchId = this.products.find((prodId) => prodId.id === id )
        
        if(searchId){
            console.log("This id: " + id + " has been found")
        }
        else{
            console.log("Id not found")
        }



    }

};

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock

    }
    
};

//Testing

const prodMan = new ProductManager()

prodMan.getProduct()


const prod1 = new Product("Marlboro", "Cigarrillos", 800, "sin imagen", "456", 500)
prodMan.addProduct(prod1)

const prod2 = new Product("Lucky Strike", "Cigarillos", 750, "sin imagen", "600", 500)
prodMan.addProduct(prod2)


const prod3 = new Product("Phillip Morris","Cigarrillos", 750, "sin imagen", "320", 400)
prodMan.addProduct(prod3)

prodMan.getProductById(1);
prodMan.getProductById(2);
prodMan.getProductById(3);

prodMan.getProduct()



