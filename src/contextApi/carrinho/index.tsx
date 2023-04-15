import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useCarrinho } from "../../graphql/Carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho ";

export interface ICarrinhoContext {
  carrinho?: ICarrinho
  adicionarItensNoCarrinho: (item: IItemCarrinho) => void
}

export const carrinhoContext = createContext<ICarrinhoContext>({
  adicionarItensNoCarrinho: () => null
})

interface CarrinhoProviderProps {
  children: ReactElement
}

const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {

  const {data} = useCarrinho()

  const adicionarItensNoCarrinho = (item: IItemCarrinho) => {
    console.log('[CarrinhoProvider] - adicionarItensNoCarrinho', item);
  }

  return (
    <carrinhoContext.Provider value={{ carrinho: data?.carrinho, adicionarItensNoCarrinho}}>
      {children}
    </carrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(carrinhoContext)
}

export default CarrinhoProvider