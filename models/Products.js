import mongoose, { Schema } from "mongoose"

// definir el esquema de los Productos
const productSchema = new mongoose.Schema({
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
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