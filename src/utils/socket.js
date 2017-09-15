import socketIO from 'socket.io-client'

let socket

export const connect = (roomId) => {
  socket = socketIO(`http://localhost:3000/${roomId}`)
  return socket
}

export const getIO = () => socket
