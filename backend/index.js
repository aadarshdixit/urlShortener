const express = require('express');
const connectdb = require('./config/db.js');
const http  = require('http');
const dotenv = require('dotenv');
const urlRoute = require('./routes/urlRoute.js')
const indexRoute = require('./routes/indexRoute.js')
const searchRoute = require('./routes/searchRoute.js')
const userRoute = require('./routes/userRoute.js')
dotenv.config();
connectdb();

const app  = express();
const server =  http.createServer(app);
// api endpoint
app.use(express.json());
app.get('/', (req, res) => {
    res.send('heloo');
  });
app.use('/api/user',userRoute)
app.use('/api/url',urlRoute); 
app.use('/api',indexRoute); 
app.use('/api/search',searchRoute)
const port = process.env.PORT;
server.listen(port,()=>{
    console.log(`server is listen at ${port}`);
})
