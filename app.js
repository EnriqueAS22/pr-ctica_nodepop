import express from 'express'
import logger from 'morgan'
import ejs from 'ejs'
import connectMongoose from './lib/connectMongoose.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as sessionManager from './lib/sessionManager.js'
import * as productsController from './controllers/productsController.js'

await connectMongoose()
console.log('Connected to MongoDB')

const app = express()

app.set('views', 'views')
app.set('view engine', 'html')
app.engine('html', ejs.__express )

app.locals.appName= 'NodePop'

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))


/**
 * Aplication routes
 */
app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)
app.get('/products/new', sessionManager.guard, productsController.index)
app.post('/products/new', sessionManager.guard, productsController.postNew)
app.get('/products/delete/:productId', sessionManager.guard, productsController.deleteProduct)
//app.post('/tags_products', homeController.tagsProducts)

export default app