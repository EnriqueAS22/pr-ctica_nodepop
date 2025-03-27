import User from '../models/Users.js'

export function index(req, res, next) {
    res.locals.error = ''
    res.render('login')
}

export async function postLogin(req, res, next) {
    try {
        const { email, password } = req.body
    
        // buscar usuario en base de datos
        const user = await User.findOne({ email: email })
    
        // si no encuentro o no es la contraseña, devuelve Error
        if (!user || !(await user.comparePassword(password))) {
            res.locals.error = 'Invalid credentials'
            res.render('login')
            return
        }
    
        // si es bueno todo -> redirect a la Home estando Logado
        res.redirect('/')

    } catch (error) {
        next(error)
    }
}