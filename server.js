const express=require('express')
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes=require('./routes/taskRoutes');
const authRoutes=require('./routes/authRoutes');
const app=express();
const PORT=5005;

// take data from .env files
require('dotenv').config();
const dbURL=process.env.dbURL;


// Connection of Database
mongoose.connect(dbURL)
.then(()=>console.log('DB connected'))
.catch(err=>console.log(err));


app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});


app.use('/auth',authRoutes);
app.use('/tasks', taskRoutes);


app.get('/',(req,res)=>{
    res.send('WELCOME TO TO DO APP HOME PAGE');
})

