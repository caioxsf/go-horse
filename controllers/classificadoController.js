import CidadeEntity from "../entities/cidadeEntity.js";
import CategoriaItemEntity from "../entities/categoriaItemEntity.js";
import ClassificadoEntity from "../entities/classificadoEntity.js";
import CondicaoEntity from "../entities/condicaoEntity.js";
import ImagemClassificadoEntity from "../entities/imagemClassificadoEntity.js";
import ImovelEntity from "../entities/imovelEntity.js";
import ItemEntity from "../entities/itemEntity.js";
import SituacaoEntity from "../entities/situacaoEntity.js";
import TipoEntity from "../entities/tipoEntity.js";
import VeiculoEntity from "../entities/veiculoEntity.js";
import ClassificadoRepository from "../repositories/classificadoRepository.js";
import ImagemClassificadoRepository from "../repositories/imagemClassificadoRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js";
import ItemRepository from "../repositories/itemRepository.js";
import VeiculoRepository from "../repositories/veiculoRepository.js";
import sharp from "sharp";

export default class ClassificadoController {
  #repoClassificado;
  #repoImovel;
  #repoImagens;
  #repoVeiculo;
  #repoItem;
  constructor() {
    this.#repoClassificado = new ClassificadoRepository();
    this.#repoImagens = new ImagemClassificadoRepository();
    this.#repoImovel = new ImovelRepository();
    this.#repoVeiculo = new VeiculoRepository();
    this.#repoItem = new ItemRepository();
  }

  async cadastrarClassificadoItem(req, res) {
    const { titulo, descricao, valor, condicaoId, situacaoId, tipoId, cidadeId,
      quartos, banheiros, metros_quadrados, tipo_imovel,
      ano, kilometragem, modeloId,
      categoriaId } = req.body;
    if (titulo && descricao && valor && condicaoId && tipoId && cidadeId) {
      let date = new Date();
      let classificadoBase = new ClassificadoEntity(0, titulo, descricao, 0, date, valor, req.usuarioLogado.id, condicaoId, situacaoId, tipoId, cidadeId);
      let classificadoImovel;
      if (tipoId == 2 && quartos && banheiros && metros_quadrados && tipo_imovel) {
        let classificadoId = await this.#repoClassificado.cadastrar(classificadoBase);

        classificadoImovel = new ImovelEntity(0, quartos, banheiros, metros_quadrados, tipo_imovel, tipoId, classificadoId);
        if ((await this.#repoImovel.cadastrarImovel(classificadoImovel)) == null)
          return res.status(401).json({ message: "Erro ao cadastrar imovel!" });

        if (classificadoId) {
          let imagens = [];
          if (req.files.length > 0) {
            for (let imagem of req.files) {
              let imagemEntity = new ImagemClassificadoEntity();
              imagemEntity.imagem = await compressImage(imagem.buffer);
              imagemEntity.classificado = classificadoId;
              imagemEntity.extensao = imagem.mimetype.split("/").pop();
              if (imagemEntity.validar()) {
                imagens.push(imagemEntity);
              } else
                throw new Error(
                  "Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)"
                );
            }

            for (let img of imagens) {
              if ((await this.#repoImagens.inserirImagem(img)) == false) {
                throw new Error("Erro ao inserir imagem no banco de dados");
              }
            }
          }
          return res
            .status(201)
            .json({ message: "Classificado criado com sucesso!" });
        } else throw new Error("Erro ao cadastrar no banco de dados!");
      }

      let classificadoVeiculo;
      if (tipoId == 3 && ano && kilometragem && modeloId) {
        let classificadoId = await this.#repoClassificado.cadastrar(
          classificadoBase
        );

        classificadoVeiculo = new VeiculoEntity(
          0,
          ano,
          kilometragem,
          modeloId,
          tipoId,
          classificadoId
        );
        if (
          (await this.#repoVeiculo.cadastrarVeiculo(classificadoVeiculo)) ==
          null
        )
          return res.status(401).json({ message: "Erro ao cadastrar imovel!" });

        if (classificadoId) {
          let imagens = [];
          if (req.files.length > 0) {
            for (let imagem of req.files) {
              let imagemEntity = new ImagemClassificadoEntity();
              imagemEntity.imagem = await compressImage(imagem.buffer);
              imagemEntity.classificado = classificadoId;
              imagemEntity.extensao = imagem.mimetype.split("/").pop();
              if (imagemEntity.validar()) {
                imagens.push(imagemEntity);
              } else
                throw new Error(
                  "Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)"
                );
            }


            for (let img of imagens) {
              if ((await this.#repoImagens.inserirImagem(img)) == false) {
                throw new Error("Erro ao inserir imagem no banco de dados");
              }
            }
          }
          return res
            .status(201)
            .json({ message: "Classificado criado com sucesso!" });
        } else throw new Error("Erro ao cadastrar no banco de dados!");
      }

      let classificadoItem;
      if (tipoId == 1 && categoriaId) {
        let classificadoId = await this.#repoClassificado.cadastrar(
          classificadoBase
        );

        classificadoItem = new ItemEntity(
          0,
          categoriaId,
          tipoId,
          classificadoId
        );
        if ((await this.#repoItem.cadastrarItem(classificadoItem)) == null)
          return res.status(401).json({ message: "Erro ao cadastrar item!" });

        if (classificadoId) {
          let imagens = [];
          if (req.files.length > 0) {
            for (let imagem of req.files) {
              let imagemEntity = new ImagemClassificadoEntity();
              imagemEntity.imagem = await compressImage(imagem.buffer);
              imagemEntity.classificado = classificadoId;
              imagemEntity.extensao = imagem.mimetype.split("/").pop();
              if (imagemEntity.validar()) {
                imagens.push(imagemEntity);
              } else
                throw new Error(
                  "Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)"
                );
            }

            for (let img of imagens) {
              if ((await this.#repoImagens.inserirImagem(img)) == false) {
                throw new Error("Erro ao inserir imagem no banco de dados");
              }
            }
          }
          return res
            .status(201)
            .json({ message: "Classificado criado com sucesso!" });
        } else throw new Error("Erro ao cadastrar no banco de dados!");
      }
    }
    throw new Error("Parâmetros invalidos!");
  }

  async alterarClassificadoItem(req, res) {
    const { id, titulo, descricao, valor, condicaoId, situacaoId, tipoId, cidadeId,
      quartos, banheiros, metros_quadrados, tipo_imovel,
      ano, kilometragem, modeloId,
      categoriaId } = req.body;

    if (titulo && descricao && valor && condicaoId && tipoId && cidadeId) {
      let classificadoExistente = await this.#repoClassificado.obterClassificadoCompleto(id);
      if (!classificadoExistente) {
        return res.status(404).json({ message: "Classificado não encontrado!" });
      }
      let date = new Date()
      let classificadoBase = new ClassificadoEntity(0, titulo, descricao, 0, date, valor, req.usuarioLogado.id, condicaoId, situacaoId, tipoId, cidadeId);
      let updateClassificado = await this.#repoClassificado.atualizarClassificado(classificadoBase, id);

      if (!updateClassificado) {
        return res.status(500).json({ message: "Erro ao atualizar classificado!" });
      }

      if (tipoId == 2 && quartos && banheiros && metros_quadrados && tipo_imovel) {
        let imovelExistente = await this.#repoImovel.obterImovel(id);
        if (!imovelExistente) {
          return res.status(404).json({ message: "Imóvel não encontrado!" })
        }
        let classificadoImovel = new ImovelEntity(
          0,
          quartos,
          banheiros,
          metros_quadrados,
          tipo_imovel,
          tipoId,
          id
        );
        let resultImovel = await this.#repoImovel.alterarImovel(classificadoImovel, id)

        if (!resultImovel) {
          return res.status(401).json({ message: "Erro ao atualizar imóvel!" });
        }

        if (imovelExistente) {
          let imagens = [];
          if (req.files.length > 0) {

            for (let imagem of req.files) {
              let imagemEntity = new ImagemClassificadoEntity();
              imagemEntity.imagem = await compressImage(imagem.buffer);
              imagemEntity.classificado = id;
              imagemEntity.extensao = imagem.mimetype.split("/").pop();
              if (imagemEntity.validar()) {
                imagens.push(imagemEntity);
              } else
                throw new Error(
                  "Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)"
                );
            }

            for (let img of imagens) {
              if ((await this.#repoImagens.inserirImagem(img)) == false) {
                throw new Error("Erro ao inserir imagem no banco de dados");
              }
            }
          }
        }




        return res.status(200).json({ message: "Classificado atualizado com sucesso!" });
      }

      if (tipoId == 3 && ano && kilometragem && modeloId) {
        let veiculoExistente = await this.#repoVeiculo.obterVeiculo(id);
        if (!veiculoExistente) {
          return res.status(404).json({ message: "Veículo não encontrado!" })
        }
        let classificadoVeiculo = new VeiculoEntity(
          0,
          ano,
          kilometragem,
          modeloId,
          tipoId,
          id
        );
        let resultVeiculo = await this.#repoVeiculo.alterarVeiculo(classificadoVeiculo, id)

        if (!resultVeiculo) {
          return res.status(401).json({ message: "Erro ao atualizar veículo!" });
        }

        if (veiculoExistente) {
          let imagens = [];
          if (req.files.length > 0) {

            for (let imagem of req.files) {
              let imagemEntity = new ImagemClassificadoEntity();
              imagemEntity.imagem = await compressImage(imagem.buffer);
              imagemEntity.classificado = id;
              imagemEntity.extensao = imagem.mimetype.split("/").pop();
              if (imagemEntity.validar()) {
                imagens.push(imagemEntity);
              } else
                throw new Error(
                  "Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)"
                );
            }

            for (let img of imagens) {
              if ((await this.#repoImagens.inserirImagem(img)) == false) {
                throw new Error("Erro ao inserir imagem no banco de dados");
              }
            }
          }
        }

        return res.status(200).json({ message: "Classificado atualizado com sucesso!" });
      }

      if (tipoId == 1 && categoriaId) {
        let itemExistente = await this.#repoItem.obterItem(id);
        if (!itemExistente) {
          return res.status(404).json({ message: "Item não encontrado!" })
        }
        let classificadoItem = new ItemEntity(
          0,
          categoriaId,
          tipoId,
          id
        );
        let resultItem = await this.#repoItem.atualizarItem(classificadoItem, id)

        if (!resultItem) {
          return res.status(401).json({ message: "Erro ao atualizar item!" });
        }

        if (itemExistente) {
          let imagens = [];
          if (req.files.length > 0) {

            for (let imagem of req.files) {
              let imagemEntity = new ImagemClassificadoEntity();
              imagemEntity.imagem = await compressImage(imagem.buffer);
              imagemEntity.classificado = id;
              imagemEntity.extensao = imagem.mimetype.split("/").pop();
              if (imagemEntity.validar()) {
                imagens.push(imagemEntity);
              } else
                throw new Error(
                  "Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)"
                );
            }

            for (let img of imagens) {
              if ((await this.#repoImagens.inserirImagem(img)) == false) {
                throw new Error("Erro ao inserir imagem no banco de dados");
              }
            }
          }
        }

        return res.status(200).json({ message: "Classificado atualizado com sucesso!" });
      }
    }
    return res.status(400).json({ message: "Parâmetros inválidos!" });
  }

  async listarClassificadoCompleto(req, res) {
    let classificados = await this.#repoClassificado.listarPublic();
    if (classificados.length > 0) return res.status(200).json(classificados);
    return res.status(404).json({ msg: "Nenhum classificado foi encontrado!" });
  }

  async obterClassificado(req, res) {
    let { id } = req.params;
    let classificados = await this.#repoClassificado.obterClassificadoCompleto(
      id
    );
    if (classificados.length > 0) {
      await this.#repoClassificado.acrescentarVisualizacao(id);
      return res.status(200).json(classificados);
    } else return res.status(404).json({ msg: "Classificado não encontado" });
  }

  async venderClassificado(req, res) {
    let { id } = req.params;
    let obter = await this.#repoClassificado.obterClassificadoUsuarioId(id, req.usuarioLogado.id);
    if (obter.length > 0) {
      if (await this.#repoClassificado.venderClassificado(id, req.usuarioLogado.id))
        return res.status(200).json({ msg: "Classificado vendido com sucesso!" });
      throw new Error("Erro ao vender classificado no banco de dados");
    } else
      return res.status(404).json({ msg: "Esse classificado não existe!" });
  }

  async pausarClassificado(req, res) {
    let { id } = req.params;
    let obter = await this.#repoClassificado.obterClassificadoUsuarioId(id, req.usuarioLogado.id);
    if (obter.length > 0) {
      if (await this.#repoClassificado.pausarClassificado(id, req.usuarioLogado.id))
        return res.status(200).json({ msg: "Classificado pausado com sucesso!" });
      throw new Error("Erro ao pausar classificado no banco de dados");
    } else
      return res.status(404).json({ msg: "Esse classificado não existe!" });
  }

  async ativarClassificado(req, res) {
    let { id } = req.params;
    let obter = await this.#repoClassificado.obterClassificadoUsuarioId(id, req.usuarioLogado.id);
    if (obter.length > 0) {
      if (await this.#repoClassificado.ativarClassificado(id, req.usuarioLogado.id))
        return res.status(200).json({ msg: "Classificado ativado com sucesso!" });
      throw new Error("Erro ao ativar classificado no banco de dados");
    } else
      return res.status(404).json({ msg: "Esse classificado não existe!" });
  }


  async deletarClassificado(req, res) {
    let { id } = req.params;
    let obter = await this.#repoClassificado.obterClassificadoUsuarioId(
      id,
      req.usuarioLogado.id
    );
    if (obter.length > 0) {
      if (
        await this.#repoClassificado.deletarClassificado(
          id,
          req.usuarioLogado.id
        )
      )
        return res
          .status(200)
          .json({ msg: "Classificado deletado com sucesso!" });
      throw new Error("Erro ao deletar classificado no banco de dados");
    } else
      return res.status(404).json({ msg: "Esse classificado não existe!" });
  }



  async meusClassificados(req, res) {
    let classificados = await this.#repoClassificado.meusClassificados(
      req.usuarioLogado.id
    );
    if (classificados.length > 0) return res.status(200).json(classificados);
    return res.status(404).json({ msg: "Nenhum classificado foi encontrado!" });
  }

  async imagens(req, res) {
    let { id } = req.params;
    let lista = await this.#repoImagens.listarPorImovel(id);
    if (lista.length > 0) {
      return res.status(200).json(lista);
    } else return res.status(404).json({ msg: "Nenhuma imagem encontrada!" });
  }

  async buscarTermo(req, res) {
    const termo = req.query.termo;

    if (!termo) {
      return res
        .status(400)
        .json({ mensagem: "Parâmetro 'termo' é obrigatório." });

    }

    const resultados = await this.#repoClassificado.buscarPorNome(termo);


    return res.status(200).json(resultados);
  }

  async listarClassificadoIds(req, res) {
    let { id } = req.params;
    let classificados = await this.#repoClassificado.listarClassificadoIds(id);
    if (classificados.length > 0)
      return res.status(200).json(classificados);
    return res.status(404).json({ msg: "Nenhum classificado foi encontrado!" });
  }

  async excluirImagensPorId(req, res) {
    let { id } = req.params;

    if (!await this.#repoClassificado.excluirImagensPorId(id)) {
      return res.status(404).json({ msg: "Nenhuma imagem encontrada!" });
    }
    return res.status(200).json({ msg: "Imagem excluídas com sucesso!" });

  }

  async obterNomeUsuarioPeloid(req, res) {
    let { id1, id2 } = req.params;

    let nomes = await this.#repoClassificado.obterNomeUsuarioPeloid(id1, id2)
    if (nomes.length <= 0)
      return res.status(404).json({ message: "Nenhum usuario com esse nome foi encontrado!" })

    return res.status(200).json(nomes)
  }
}


async function compressImage(buffer) {
  try {
    const compressedImage = await sharp(buffer)
      .rotate()
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();

    return compressedImage;
  } catch (error) {
    throw new Error("Erro ao comprimir a imagem");
  }
}