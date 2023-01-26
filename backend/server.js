const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./server/config/database');
const route = require('./server/routes/loginRouter')
const client = require('./server/database/client');
const mapRouter = require('./server/routes/mapRouter');
const catRouter = require('./server/routes/catRouter');

dotenv.config()
const app = express();

const connection = async(req, res)=>{
    try {
        await db.authenticate()
        console.log('Database Connected')
        await db.sync()
    } catch (error) {
        console.log(error)
    }
}
connection()


app.use(bodyParser.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());

app.use('/api/mapping', mapRouter);
app.use('/api/category', catRouter);
// app.use('/api/user', route)

app.listen(5000, ()=>{
    console.log('Server is running')
})
