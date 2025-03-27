import express from 'express'
import logger from 'morgan'
import ejs from 'ejs'
import connectMongoose from './lib/connectMongoose.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'

await connectMongoose()
console.log('Connected to MongoDB')

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.set('views', 'views')
app.set('view engine', 'html')
app.engine('html', ejs.__express )
app.locals.appName= 'NodePop'

/**
 * Aplication routes
 */
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.post('/tags_products', homeController.tagsProducts)

export default app