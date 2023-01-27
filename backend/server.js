const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./server/database/client');
const loginRouter = require('./server/routes/loginRouter');
const mapRouter = require('./server/routes/mapRouter');
const catRouter = require('./server/routes/catRouter');

dotenv.config({ path:"config.env"})
const app = express();

const connection = async(req, res)=>{
    try {
        await db.authenticate()
        await db.sync()
        console.log('Database Connected')
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
app.use('/api/users', loginRouter);

app.listen(3100, ()=>{
    console.log('Server is running')
})
