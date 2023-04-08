import { ICategoria } from "../../interfaces/ICategoria"
import {gql, useQuery} from '@apollo/client'
import CardLivro from "../CardLivro"
import './ListaLivros.css'
import { ILivro } from "../../interfaces/ILivro"

interface ListaLivrosProps {
  categoria: ICategoria
}

const OBTER_LIVROS = gql`
    query ObterLivros {
        livros {
            id
            slug
            titulo
            imagemCapa
            opcoesCompra {
                id
                preco
        }
        }
    }
`

const ListaLivros = ({categoria}: ListaLivrosProps) => {

  const { data } = useQuery<{livros: ILivro[]}>(OBTER_LIVROS)

  return (
    <section className="livros">
      {data?.livros.map(livro => (
        <CardLivro key={livro.id} livro={livro}/>
      ))}
    </section>
  )
}

export default ListaLivros