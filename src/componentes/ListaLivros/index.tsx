import { ICategoria } from "../../interfaces/ICategoria"
import { AbCampoTexto } from "ds-alurabooks"
import { useEffect, useState } from "react"
import useLivros from "../../graphql/livros/hooks"
import CardLivro from "../CardLivro"
import './ListaLivros.css'
import { useReactiveVar } from "@apollo/client"
import { FiltroLivrosVar, livrosVar } from "../../graphql/livros/state"

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoDaBusca] = useState('')

  useEffect(() =>{   
      FiltroLivrosVar({
        ...FiltroLivrosVar(),
        titulo: textoBusca.length >= 3 ? textoBusca : ''
      })
  }, [textoBusca])

  FiltroLivrosVar({
    ...FiltroLivrosVar(),
    categoria,
  })

  const livros = useReactiveVar(livrosVar)

  useLivros();

  return (
    <section>
      <form style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center' }}>
        <AbCampoTexto value={textoBusca} onChange={setTextoDaBusca} placeholder='Digite o título'/>
      </form>
      <div className="livros">
        {livros.map(livro => (
        <CardLivro key={livro.id} livro={livro} />
      ))}
      </div>
    </section>
  )
}

export default ListaLivros