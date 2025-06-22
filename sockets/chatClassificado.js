
export default function chatSocket(io, socket){
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);

    })

    socket.on("sendMessage", ({roomId, message, senderId}) => {
        io.to(roomId).emit("receiveMessage", {message, senderId})
    });

    socket.on('disconnet', () => {

    });
}