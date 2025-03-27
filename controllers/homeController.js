import Product from '../models/Products.js'


export async function index (req, res, next) {
    /**
     * Creación de Productos a mano, aún no tienen usuarios
     */
    const userId = req.session.userId

    res.locals.products = await Product.find({ owner: userId })
    res.render('home')
}

// POSTMAN
export function tagsProducts (req, res, next) {
    const tags = req.body.tags
    //console.log(req.body)
    res.send(tags)
}