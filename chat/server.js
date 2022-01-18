const path = require('path')
const http = require('http');
const express = require('express')
const socketio = require('socket.io')
const formatMessage =  require('./utils/messages')
const {userJoin, getCurrentUser, userLeave} = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)
const botName = 'F.M.S bot'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    console.log('trial...')
    socket.on('joinRoom', ({username, room })=>{
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        
        socket.emit('message', formatMessage(botName , 'welcome to F.M.S Academy group Chat', socket.id))

        console.log(user.username)
    socket.broadcast.emit('message', formatMessage(botName , `${user.username} has joined the chat`, socket.id));
 

    })
    
   

    socket.on('chatMessage', msg =>{
        const user = getCurrentUser(socket.id)
        io.emit('message',formatMessage(user.username, msg, socket.id))
    })

    socket.on('disconnect', ()=> {
        const user = userLeave(socket.id)
        if(user){
            io.emit('message', formatMessage(botName ,`${user.username} has left the chat`, socket.id))
        }
        
    }); 
    
} )





const port = 9000 || process.env.PORT



server.listen(port, ()=> console.log(`server running on port ${port}`))

