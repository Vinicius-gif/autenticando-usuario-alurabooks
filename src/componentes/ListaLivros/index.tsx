import { useQuery } from "@tanstack/react-query"
import { ICategoria } from "../../interfaces/ICategoria"
import { obterProdutosDaCategoria } from "../../http"
import CardLivro from "../CardLivro"
import './ListaLivros.css'

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({categoria}: ListaLivrosProps) => {

  const {data: produtos} = useQuery(['buscaLivrosPorCategoria', categoria], () => obterProdutosDaCategoria(categoria))

  console.log(produtos);
  
  return (
    <section className="livros">
      {produtos?.map(livro => (
        <CardLivro key={livro.id} livro={livro}/>
      ))}
    </section>
  )
}

export default ListaLivros