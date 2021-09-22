const express =require('express');
const http  =   require("http");
const app=express();
const formatMessage=require('./utils/messages')
const socketio=require('socket.io');
const botName='ChatUp Bot';

const server=http.createServer(app);
const io=socketio(server);
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))

io.on('connection',socket=>{
    
    //welcome current user
    socket.emit('message', formatMessage(botName,'Welcomme to Chatup'));

    //brodcast when a user connect
    socket.broadcast.emit('message',formatMessage(botName ,'A user has join the chat'));
 
 
    // when user disconnect
    socket.on('disconnect', ()=>{
        io.emit('message', formatMessage(botName ,'A user has left the chat'));
    });

    // listen to chat message

    socket.on('chatMessage',msg=>{
        io.emit('message',formatMessage('User' ,msg))
    })
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.get('/chat', (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/chat.html'));
})

const port =process.env.PORT||5000;
server.listen(port,()=>{
    console.log(`server running on port ${port}`);
})