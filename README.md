# 🛒 Sistema de Classificados Online

Este projeto tem como objetivo oferecer uma plataforma onde usuários possam publicar e visualizar anúncios de produtos, similar a plataformas como OLX, Facebook Marketplace e Webmotors. O sistema é dividido em duas áreas principais: **funcionalidades públicas** (acessíveis a todos os visitantes) e **funcionalidades restritas** (disponíveis apenas para usuários autenticados).

---

## ✨ Funcionalidades

### Funcionalidades Públicas
- **Registro de Novos Usuários**:  
  Visitantes podem criar uma conta fornecendo nome, e-mail e senha. O sistema valida os dados e cria um perfil único para cada usuário.

- **Autenticação**:  
  Usuários cadastrados podem acessar sua conta através de login com e-mail e senha. O sistema verifica as credenciais e concede acesso às funcionalidades restritas.

- **Visualização de Classificados**:  
  - Listagem de anúncios com:
    - Imagens em miniatura
    - Título
    - Preço
    - Localização
  - Sistema de filtros para refinar a busca por:
    - Cidade/localização
    - Tipo de classificado (item, imóvel, veículo)
    - Condição do produto (novo, usado)
    - Ordenação por data de publicação ou preço

- **Detalhes do Classificado**:  
  Qualquer visitante pode acessar a página de detalhes de um anúncio, que exibe:
  - Múltiplas imagens do produto
  - Título completo
  - Descrição detalhada
  - Valor/preço
  - Informações do vendedor
  - Localização
  - Data de publicação

> **Nota**: Visitantes não autenticados podem visualizar os anúncios, mas não podem enviar mensagens ao vendedor ou salvar classificados.

---

### Funcionalidades Restritas
- **Criação de Classificados**:  
  Usuários autenticados podem criar anúncios fornecendo:
  - Título
  - Descrição detalhada
  - Tipo
  - Valor
  - Condição do produto
  - Localização
  - Upload de múltiplas imagens

- **Gerenciamento de Classificados**:  
  Usuários podem:
  - Visualizar seus anúncios ativos e inativos
  - Editar informações dos anúncios
  - Excluir anúncios
  - Alterar a situação (ativo/inativo)
  - Ver estatísticas de visualizações

- **Sistema de Mensagens**:  
  - Enviar mensagens aos vendedores diretamente pela página de detalhes do classificado
  - Receber e enviar mensagens em tempo real utilizando WebSocket
  - Acessar uma página de mensageria com todas as conversas organizadas

- **Salvar Classificados**:  
  - Salvar anúncios de interesse para visualização posterior
  - Acessar uma página com todos os classificados salvos
  - Remover itens da lista de salvos

---

## 🛠️ Aspectos Técnicos

- **Frontend**: Interface responsiva e amigável utilizando **Next.js**.
- **Backend**: API RESTful para operações principais utilizando **Express**.
- **WebSocket**: Comunicação em tempo real para troca de mensagens.
- **Banco de Dados**: Armazenamento de informações de usuários, classificados e mensagens.
- **Sistema de Autenticação**: Controle de acesso às funcionalidades restritas com **tokens JWT**.
- **Upload de Imagens**: Sistema para armazenamento e otimização das imagens dos classificados.

---
