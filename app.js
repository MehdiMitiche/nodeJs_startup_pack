const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const jwt = require('jsonwebtoken')
const expressValidator = require('express-validator')
const session = require('express-session')
const passport = require('passport')

const app = express()

const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const authRouter = require('./routes/authRoutes')


//the Path to the database
mongoose.connect('mongodb://localhost/Mentor')

const db = mongoose.connection
db.once('open', () => {
    console.log('Db Connected !')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

//Body-Parser MiddelWar
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Using Express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))


require('./config/passport')(passport);
//Passport Middelware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

//Express Validator
app.use(expressValidator())

//VerifyTokenMiddelware
const verifyToken = (req, res, next) => {
    //get Auth HeaderValue
    const bearerHeader = req.headers['x-access-token']
    if (typeof(bearerHeader) !== 'undefined') {
        //Format Of Token
        //Authorization : Bearer <Token>
        const bearer = bearerHeader.split(' ')
        const access_token = bearer[1]
        //req.token = access_token
        jwt.verify(access_token, 'SecretKeyHere', (err, decoded) => {
            if (err) {
                res.json({
                    err
                })
            } else {
                req.userData = decoded
                next()
            }
        })
    } else {
        //Forbiden
        res.sendStatus(403)
    }
}

app.get('/', (req, res) => {
    res.send('Mentor Link is Comming ')
})

//authentification Needed
app.get('/post', verifyToken, (req, res) => {
    res.send({
        userData: req.userData
    })

})

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

app.listen(8080, () => {
    console.log('Server Lunched In Port 8080')
})