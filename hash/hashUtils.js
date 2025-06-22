import bcrypt from "bcrypt";

export async function gerarHash(senha) {
  const hash = await bcrypt.hash(senha, 15);
  return hash;
}

export async function verificarSenha(senha, hash) {
  const senhaValida = await bcrypt.compare(senha, hash);
  return senhaValida;
}
