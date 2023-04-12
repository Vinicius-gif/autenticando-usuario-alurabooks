import { gql } from "@apollo/client";

export const OBTER_LIVRO = gql`
query ObterLivro($slug: String!) {
  livro(slug: $slug) {
    id
    imagemCapa
    descricao
    titulo
    slug
    sobre
    autor {
      nome
      sobre
    }
    opcoesCompra {
        id
        titulo
        formatos
        preco
    }
    tags {
      nome
    }
  }
}`