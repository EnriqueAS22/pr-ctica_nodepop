import mongoose from "mongoose"

// definir el esquema de los Productos
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    tags: [String]
}, {
    collection: 'products'
})

// crear modelo de Producto
const Product = mongoose.model('Product', productSchema)

// exportarlo
export default Product