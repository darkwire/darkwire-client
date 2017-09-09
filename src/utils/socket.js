import socketIO from 'socket.io-client'

export const connect = (roomId) => {
  return socketIO(`http://localhost:3000/${roomId}`)
}