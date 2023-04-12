import './DetalhesLivro.css'
import { useParams } from 'react-router-dom'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from 'ds-alurabooks'
import { formatador } from '../../utils/formatador-moeda'
import { useState } from 'react'
import { useLivro } from '../../graphql/livro/hooks'

const DetalhesLivro = () => {
  const params = useParams()

  const [opcao, setOpcao] = useState<AbGrupoOpcao>()

  const {data} = useLivro(params.slug || '')

  const opcoes: AbGrupoOpcao[] = data?.livro.opcoesCompra ? data?.livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: formatador.format(opcao.preco),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
  }))
    : []

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
                <AbInputQuantidade />
              </div>
              <div>
                <AbBotao texto="Comprar" />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetalhesLivro