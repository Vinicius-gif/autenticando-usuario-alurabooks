import './TituloPrincipal.css'

interface TituloPrincipalProps {
  texto: string;
}

const TituloPrincipal = ({texto}: TituloPrincipalProps) => {
  return (
    <h2 className="TituloPrincipal">{texto}</h2>
  )
}

export default TituloPrincipal