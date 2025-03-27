import readline from 'node:readline/promises'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Products.js'
import User from './models/Users.js'

/**
 * CONEXION MONGO
 */
const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

/**
 * PROGUNTA initDB
 */
const answer = await ask('Are you sure you want to delete database collection? (n)')
if (answer !== 'y') {
    console.log('Operation aborted')
    process.exit()
}

/**
 * INIT
 */
await initUsers()
await initProducts()
await connection.close()

/**
 * USUARIOS
 */
async function initUsers() {
    const result = await User.deleteMany()
    console.log(`Deleted ${result.deletedCount} users.`)

    const insertResult = await User.insertMany(
        { email: 'paco@usuario.com', password: await User.hashPassword('1234') }
    )
    console.log(`Insert ${insertResult.length} users.`)
}

/**
 * PRODUCTOS
 */
async function initProducts() {
    const result = await Product.deleteMany()
    console.log(`Deleted ${result.deletedCount} products.`)

    const [paco] = await Promise.all([
        User.findOne({ email: 'paco@usuario.com' })
    ])

    const insertResult = await Product.insertMany(
        { name: 'Seat 500', owner: paco._id , price: 3000, image: 'https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/85ca4b51-1aff-4e07-acaa-1e925d446634?rule=hw396_70', tags: ['motor']}
    )
    console.log(`Insert ${insertResult.length} products.`)
}

/**
 * PREGUNTA initDB
 */
async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const result = await rl.question(question)
    rl.close()
    return result
}