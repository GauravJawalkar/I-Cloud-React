const connectToMongo=require('./db');
const express = require('express')
const mongoose=require('mongoose')
var cors=require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Hello Gaurav!')
  })

app.listen(port, () => {
  console.log(`I-Cloud Backend is listening at port http://localhost:${port}`)
})
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})