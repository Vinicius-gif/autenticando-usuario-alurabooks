import { Link } from "react-router-dom"
import { AbBotao } from "ds-alurabooks"
import { formatador } from "../../utils/formatador-moeda"
import { useCarrinhoContext } from "../../contextApi/carrinho"
import TituloPrincipal from "../../componentes/TituloPrincipal"
import ItemCarrinho from "./ItemCarrinho"

import './Carrinho.css'

const Carrinho = () => {

    const { carrinho, adicionarItemCarrinho } = useCarrinhoContext()

    return (<section className="pagina-carrinho">

        <TituloPrincipal texto="Minha sacola" />
        <div className="conteudo">
            <h4>Itens selecionados</h4>
            <div className="itens">
                {carrinho?.itens.map((item, index) => 
                    <ItemCarrinho key={index} item={item} />)}  
            </div>
            <div>
                <Link to='/'>Continuar comprando</Link>
            </div>
            <footer>
                <ul>
                    <li>Total da compra</li>
                    <li><strong>{formatador.format(carrinho?.total || 0)}</strong></li>
                    <li>
                        <AbBotao texto="Finalizar compra" />
                    </li>
                </ul>
            </footer>
        </div>
    </section>)
}

export default Carrinho