const express= require('express');
const dotenv= require('dotenv').config();
const port=process.env.PORT|| 3030;

const app=express();

//For BodyParser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/openai',require('./routes/openaiRoutes'));

app.listen(port,()=>{console.log(`Server is running on ${port}`)});
