import { gerarHash } from "../hash/hashUtils.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {
  #repoUsuario;
  constructor() {
    this.#repoUsuario = new UsuarioRepository();
  }

  async create(req, res) {
    let { email, nome, senha } = req.body;
    if (email && nome && senha) {
      let passwordHash = await gerarHash(senha);
      let usuario = new UsuarioEntity(0, email, nome, passwordHash);
      if (await this.#repoUsuario.create(usuario))
        return res.status(201).json({ msg: "Usuario criado!" });
      else throw new Error("Erro ao cadastrar usuario no banco de dados");
    } else return res.status(400).json({ msg: "Parâmetros invalidos!" });
  }

  async perfil (req,res) {
    let perfil = await this.#repoUsuario.perfil(req.usuarioLogado.id);
    if(perfil) 
      return res.status(200).json(perfil);

  }
}
