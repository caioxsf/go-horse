import ChatRepository from "../repositories/chatRepository.js";



export default function socketInit(io) {

  io.on("connection", (socket) => {
    socket.on("entrar sala", (sala_id) => {
      console.log(`🧑‍💻 Socket ${socket.id} entrou na sala sala_${sala_id}`);
      socket.join(`sala_${sala_id}`);
    });
    console.log("🟢 Conectado:", socket.id);
    const msgRepository = new ChatRepository();

    socket.on("chat message", async (msg) => {

      const result = await msgRepository.gravarMensagem(msg);

      console.log(`📨 ${socket.id}: ${msg.texto}`);

      io.to(`sala_${msg.sala_id}`).emit('chat message', result);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Desconectado:", socket.id);
    });
  });
}
