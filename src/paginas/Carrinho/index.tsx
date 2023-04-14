import { AbBotao } from "ds-alurabooks"
import { Link } from "react-router-dom"
import { formatador } from "../../utils/formatador-moeda"
import { useCarrinho } from "../../graphql/Carrinho/hooks"
import TituloPrincipal from "../../componentes/TituloPrincipal"
import ItemCarrinho from "../../componentes/ItemCarrinho"

import './Carrinho.css'

const Carrinho = () => {
    const { data } = useCarrinho()

    return (<section className="pagina-carrinho">

        <TituloPrincipal texto="Minha sacola" />
        <div className="conteudo">
            <h4>Itens selecionados</h4>
            <div className="itens">
                {data?.carrinho?.itens.map((item, index) => 
                    <ItemCarrinho key={index} item={item} />)}  
            </div>
            <div>
                <Link to='/'>Continuar comprando</Link>
            </div>
            <footer>
                <ul>
                    <li>Total da compra</li>
                    <li><strong>{formatador.format(data?.carrinho?.total || 0)}</strong></li>
                    <li>
                        <AbBotao texto="Finalizar compra" />
                    </li>
                </ul>
            </footer>
        </div>
    </section>)
}

export default Carrinho