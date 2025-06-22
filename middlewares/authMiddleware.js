import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/usuarioRepository.js";
const SECRET = "@@S3GR3D0@@";

export default class AuthMiddleware {
  gerarToken(id, email, nome, datacadastro) {
    return jwt.sign(
      { id: id, email: email, nome: nome, datacadastro: datacadastro},
      SECRET,
      { expiresIn: 10000 }
    );
  }

  async validar(req, res, next) {
    if (req.headers.authorization == null)
      return res.status(401).json({ msg: "Token de acesso não foi enviado!" });

    let token = req.headers["authorization"].split(" ")[1];
    if (token) {
      let usuarioToken = null;
      let tokenValido = false;
      try {
        usuarioToken = jwt.verify(token, SECRET);
        tokenValido = true;
      } catch(ex) {
        if(ex.name == "TokenExpiredError") {
          usuarioToken = jwt.verify(token, SECRET, {ignoreExpiration: true})
          let auth = new AuthMiddleware();
          let novoToken = auth.gerarToken(usuarioToken.id, usuarioToken.email, usuarioToken.nome, usuarioToken.datacadastro)
          res.set["authorization"] = `Bearer ${novoToken}`;
          tokenValido = true;
        } else return res.status(401).json({ msg: "Usuario não autorizado" });
      }
      if (tokenValido) {
        let repoUsuario = new UsuarioRepository();
        let usuarioBanco = await repoUsuario.ObterUsuarioLogin(usuarioToken.id);
        if (usuarioBanco.length > 0) {
          if (usuarioBanco[0]) {
            req.usuarioLogado = usuarioBanco[0];
            next();
          } else {
            res.status(401).json({ msg: "Usuario não autorizado" });
          }
        } else res.status(401).json({ msg: "Usuario não inexistente!" });
      }

    } else res.status(401).json({ msg: "Usuario não inexistente!" });
  }
}
