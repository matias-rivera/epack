const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const morgan = require('morgan')
const path = require('path')
const userRoutes = require('./routes/user')
const clientRoutes = require('./routes/client')


dotenv.config()
connectDB()
const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


//ROUTES
app.use('/api/users',userRoutes)
app.use('/api/clients', clientRoutes)

const __dirname1 = path.resolve()
app.use('/uploads', express.static(path.join(__dirname1, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'/frontend/build')))

    app.get('*',(req, res) => res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req,res) => {
        res.send('API is running...')
    });
}


const PORT = process.env.PORT || 5000

 app.listen(PORT, console.log(`Server running on port ${PORT}`))


