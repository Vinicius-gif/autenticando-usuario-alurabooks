import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../componentes/BarraNavegacao"
import Newsletter from "../../componentes/Newsletter"
import Rodape from "../../componentes/Rodape"
import TagsCategorias from "../../componentes/TagsCategorias"

const PaginaBase = () => {
    return (<main>
        <BarraNavegacao />
        <Outlet />
        <TagsCategorias />
        <Newsletter />
        <Rodape />
    </main>)
}

export default PaginaBase