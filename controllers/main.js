const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    
    // basic solution: check in the controller
    if(!username || !password) {
        throw new CustomAPIError('please provide email and password', 400)
    }

    // just form demo!
    const id = new Date().getDate()

    // header, payload(data) and signature
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn:'30d' })

    res.status(200).json({ msg:'user created', token })
}

const dashboard = async (req, res) => {
    // verificando se tem o token de autorização no header
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        console.log(data)
    } catch (error) {
        throw new CustomAPIError('Unauthorized to access this route', 401)
    }

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello, Emerson Nobre`, secret: `Lucky Number: ${luckyNumber}` })
}

module.exports = { 
    login,
    dashboard
}