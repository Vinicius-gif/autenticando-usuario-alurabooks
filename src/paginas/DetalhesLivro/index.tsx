import './DetalhesLivro.css'
import { useParams } from 'react-router-dom'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade, AbTag } from 'ds-alurabooks'
import { formatador } from '../../utils/formatador-moeda'
import { useState } from 'react'
import Loader from '../../componentes/Loader'
import BlocoSobre from '../../componentes/BlocoSobre'
import { useLivro } from '../../graphql/livros/hooks'

const DetalhesLivro = () => {
  const params = useParams()

  const [opcao, setOpcao] = useState<AbGrupoOpcao>()

  const { data, loading, error } = useLivro(params.slug || '')

  const opcoes: AbGrupoOpcao[] = data?.livro.opcoesCompra ? data?.livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: formatador.format(opcao.preco),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
  }))
    : []

  if (error) {
    return <h1>Ops, algo inesperado aconteceu!</h1>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <section className="livro-detalhe">
      <TituloPrincipal texto="Detalhes do Livro" />
      <div className="">
        <div className='container'>
          <figure>
            <img src={data?.livro.imagemCapa} alt={data?.livro.descricao} />
          </figure>
          <div className="detalhes">
            <h2>{data?.livro.titulo}</h2>
            <p>{data?.livro.descricao}</p>
            <h3>Selecione o formato do seu livro:</h3>
            <div className="opcoes">
              <AbGrupoOpcoes
                opcoes={opcoes}
                onChange={setOpcao}
                valorPadrao={opcao}
              />
            </div>
            <p><strong>*Você terá acesso às futuras atualizações do livro.</strong></p>
            <footer>
              <div className="qtdContainer">
                {/* <AbInputQuantidade onChange={() => {}} value={1}/> */}
              </div>
              <div>
                <AbBotao texto="Comprar" />
              </div>
            </footer>
          </div>
        </div>
        <div>
          <BlocoSobre titulo='Sobre o autor' corpo={data?.livro.autor.sobre} />
          <BlocoSobre titulo='Sobre o Livro' corpo={data?.livro.sobre} />
        </div>
        <div className="tags">
          {data?.livro.tags?.map(tag => <AbTag key={tag.nome} texto={tag.nome} />)}
        </div>
      </div>
    </section>
  )
}

export default DetalhesLivro