import { useQuery, useReactiveVar } from "@apollo/client"
import { ILivro } from "../../interfaces/ILivro"
import { OBTER_LIVROS } from "./queries"
import { FiltroLivrosVar, livrosVar } from "./state"

const useLivros = () => {
  const filtro = useReactiveVar(FiltroLivrosVar)
  return (
    useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
      variables: {
        categoriaId: filtro.categoria?.id,
        titulo: filtro.titulo
      },
      onCompleted(data) {
        if (data.livros) {
          livrosVar(data.livros)
        }
      },
    })
  )
}

export default useLivros