const express =require('express');
const app=express();
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.get('/chat', (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/chat.html'));
})

const port =process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})