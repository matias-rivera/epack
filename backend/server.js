const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path')

const app = express()
dotenv.config()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


//ROUTES




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


