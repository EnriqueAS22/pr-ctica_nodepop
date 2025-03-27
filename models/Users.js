import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


// definir el esquema de los Usuarios
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
}, {
    collection: 'users'
})

//metodo del modelo
userSchema.statics.hashPassword = (clearPasword) => {
    return bcrypt.hash(clearPasword, 7)
}

// crear modelo de Usuarios
const User = mongoose.model('User', userSchema)

// exportarlo
export default User