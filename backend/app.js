const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const cookieParser = require('cookie-parser');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1',
        'https://outlaytrackerbackend.onrender.com',
        'https://outlay-tracker-ft.netlify.app'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions))
app.use(cookieParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()