const express =require('express');
const http  =   require("http");
const app=express();

const socketio=require('socket.io');

const server=http.createServer(app);
const io=socketio(server);
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))

io.on('connection',socket=>{
    
    //welcome current user
    socket.emit('message','Welcomme to Chatup');

    //brodcast when a user connect
    socket.broadcast.emit('message','A user has join the chat');
 
 
    // when user disconnect
    socket.on('disconnect', ()=>{
        io.emit('message','A user has left the chat');
    });

    // listen to chat message

    socket.on('chatMessage',msg=>{
        io.emit('message',msg)
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