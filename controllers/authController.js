import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import { gerarHash, verificarSenha } from "../hash/hashUtils.js";

export default class AuthController {
  #repoUsuario;

  constructor() {
    this.#repoUsuario = new UsuarioRepository();
  }

  async token(req, res) {
    let { email, senha } = req.body;
    if (email && senha) {
      let passwordHash = await this.#repoUsuario.retornarHash(email);
      if (passwordHash != null) {
        let verificar = await verificarSenha(senha, passwordHash);
        if (verificar) {
          let usuarioValidado = await this.#repoUsuario.ValidarAcesso(email, passwordHash);
          if (usuarioValidado) {
            let authMiddleware = new AuthMiddleware();

            let token = authMiddleware.gerarToken(
              usuarioValidado[0].id, 
              usuarioValidado[0].email, 
              usuarioValidado[0].nome, 
              usuarioValidado[0].datacadastro);
            return res.status(200).json({
              token: token,
              id: usuarioValidado[0].id,
              email: usuarioValidado[0].email,
              nome: usuarioValidado[0].nome,
              data: usuarioValidado[0].datacadastro,
            })
          } else {
            return res.status(401).json({ msg: "Usuario não autorizado" });
          }
        } else {
          return res.status(400).json({ msg: "Senha inválida!" });
        }
      } else
        return res.status(400).json({ msg: "Usuario ou senha incorretos!" })

    } else {
      return res.status(400).json({ msg: "Parâmetros inválidos!" });
    }
  }
}
