const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const Grid = require('gridfs-stream'); 
const methodOverride = require('method-override'); 

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json());  
app.use(methodOverride('_method')); 

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, 
(err) => { 
  if(err) throw err; 
}
);

const connection = mongoose.connection; 
connection.once('open', () => { 
    var gfs = Grid(connection.db, mongoose.mongo); 
    gfs.collection('uploads'); 
    console.log("MongoDB database connection established successfully"); 
})

const usersRouter = require('./routes/users'); 
const productsRouter = require('./routes/products');

app.use('/users', usersRouter); 
app.use('/products', productsRouter); 

app.listen(port, ()=> { 
    console.log(`Server is running on port : ${port}`); 
}); 