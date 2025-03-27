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
 * PREGUNTA initDB
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
await connection.close()

/**
 * USUARIOS
 */
async function initUsers() {
    const result = await User.deleteMany()
    console.log(`Deleted ${result.deletedCount} users.`)

    const insertResult = await User.insertMany([
        { email: 'paco@usuario.com', password: await User.hashPassword('1234') },
        { email: 'kike@usuario.com', password: await User.hashPassword('2345') },
        { email: 'manu@usuario.com', password: await User.hashPassword('3456') }
    ])
    
    console.log(`Insert ${insertResult.length} users.`)
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