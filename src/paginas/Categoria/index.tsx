import { useEffect, useState } from 'react'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import http from '../../http';
import { ICategoria } from '../../interfaces/ICategorias';
import { useParams } from 'react-router-dom';
import Loader from '../../componentes/Loader';

const Categoria = () => {

const [categoria, setCategoria] = useState<ICategoria>();
const [isLoading, setIsLoading] = useState(true);

const params = useParams();

  

useEffect(() => {
  
  setIsLoading(true)

  http.get<ICategoria []>('categorias', {
    params: {
      slug: params.slug
    }
  }).then(resposta => {
    setCategoria(resposta.data[0])
    setIsLoading(false)
  })

}, [params.slug]);

if (isLoading) {
  return <Loader/>
}

  return (
    <section>
      <TituloPrincipal texto={categoria?.nome ?? ''}/>
    </section>
  )
}

export default Categoria