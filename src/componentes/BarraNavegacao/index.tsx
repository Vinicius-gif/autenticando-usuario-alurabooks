import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../../http"
import { ICategoria } from "../../interfaces/ICategorias"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLoginUsuario from "../ModalLoginUsuario"

import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'

const BarraNavegacao = () => {

    const [modalCadastroAberta, setModalCadastroAberta] = useState(false)
    const [modalLoginAberta, setModalLoginAberta] = useState(false)

    const [categorias, setCategorias] = useState<ICategoria[]>([])

    useEffect(() => {
            http.get<ICategoria[]>('categorias')
            .then(resposta => {
                console.log(resposta.data)
                setCategorias(resposta.data)
            })
    }, [])

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(token != null)

    const aoEfetuarLogin = () => {
        setUsuarioEstaLogado(true)
        setModalLoginAberta(false)
    }

    const efetuarLogout = () => {
        setUsuarioEstaLogado(false)
        sessionStorage.removeItem('token')
        navigate('/')
    }

    const acoesQuandoDeslogado = (
        <>
            <li>
                <BotaoNavegacao 
                    texto="Login" 
                    textoAltSrc="Icone representando um usuário" 
                    imagemSrc={usuario}
                    onClick={() => setModalLoginAberta(true)}
                />
                <ModalLoginUsuario
                    aberta={modalLoginAberta}
                    aoFechar={() => setModalLoginAberta(false)}
                    aoEfetuarLogin={aoEfetuarLogin}
                />

            </li>
            <li>
                <BotaoNavegacao
                    texto="Cadastrar-se"
                    textoAltSrc="Icone representando um usuário"
                    imagemSrc={usuario}
                    onClick={() => setModalCadastroAberta(true)}
                />
                <ModalCadastroUsuario 
                    aberta={modalCadastroAberta}
                    aoFechar={() => setModalCadastroAberta(false)}
                />
            </li>
        </>
    )

    const acoesQuandoLogado = (
    <>
        <li>
            <Link to="/minha-conta/pedidos">Minha Conta</Link> 
        </li>
        <li>
        <BotaoNavegacao
            texto="Logout"
            textoAltSrc="Icone representando um usuário"
            imagemSrc={usuario}
            onClick={efetuarLogout}
        />
        </li>
    </>)


    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    {categorias.map(categorias => (
                        <li key={categorias.id}>
                            <Link to={`/categorias/${categorias.slug}`}>
                                {categorias.nome}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {usuarioEstaLogado ? acoesQuandoLogado : acoesQuandoDeslogado}
        </ul>
    </nav>)
}

export default BarraNavegacao