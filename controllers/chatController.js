import ChatRepository from "../repositories/chatRepository.js";

export default class ChatController {

    async listar(req, res) {
        const chatRepository = new ChatRepository();

        const lista = await chatRepository.listar();

        res.status(200).json(lista);
    }

    async getRoom(req, res) {
        try {
            let { user1, user2, cla_id } = req.body;

            const [u1, u2] = user1 < user2 ? [user1, user2] : [user2, user1];

            let chatRepository = new ChatRepository();
            let result = await chatRepository.encontrarSalaId(u1, u2, cla_id);

            if (result.length == 0) {
                await chatRepository.criarSala(u1, u2, cla_id);
                result = await chatRepository.encontrarSalaId(u1, u2, cla_id);
            }

            return res.status(200).json({
                sala_id: result[0].sala_id
            });
        } catch (e) {
            console.error("Erro em getRoom:", e);
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async mensagensRecebidas(req, res) {
        let chatRepository = new ChatRepository();
        let resultado = await chatRepository.mensagensRecebidas(req.usuarioLogado.id)
        if (!resultado)
            return res.status(404).json({ message: "Nehuma mensagem foi encontrada" })
        return res.status(200).json(resultado)
    }

    async obterMensagens(req, res) {
        const { sala_id } = req.body;

        let chatRepository = new ChatRepository();

        let result = await chatRepository.listarMensagens(sala_id);

        return res.status(200).json(result);
    }
}