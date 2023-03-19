import { AbBotao } from "ds-alurabooks"

import './Pedidos.css'

const Pedidos = () => {
    return (
      <section className="pedidos">
          <h1>Meus pedidos</h1>
              <ul className="pedido">
                  <li>Pedido: <strong>89019041</strong></li>
                  <li>Data do pedido: <strong>26/05/2022</strong></li>
                  <li>Valor total: <strong>R$ 48</strong></li>
                  <li>Entrega realizada em: <strong>30/05/2022</strong></li>
                  <AbBotao texto="Detalhes"/>
              </ul>
        </section>
      )}

export default Pedidos