const express = require('express')
const app = express();
const cors=require ('cors');
const port=5000;
const connectToMongo = require('./db');

// MiddleWare for using req.json in api.js file
app.use( express.json() );

// Using cors package to send api calls from frontend to backend
app.use(cors());

// Available Routes
app.use('/api/auth', require("./routes/auth"));
app.use('/api/notes', require("./routes/notes"));



app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
  console.log(` http://localhost:${ port }`)
  connectToMongo;
})
    
