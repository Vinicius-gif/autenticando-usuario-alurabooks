import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useAdicionarItem, useCarrinho } from "../../graphql/Carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho ";

export interface ICarrinhoContext {
  carrinho?: ICarrinho
  adicionarItemCarrinho: (item: IItemCarrinho) => void
}

export const carrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null
})

interface CarrinhoProviderProps {
  children: ReactElement
}

const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {

  const {data} = useCarrinho()

  const [adcionaItem] = useAdicionarItem()

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
    adcionaItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  return (
    <carrinhoContext.Provider 
      value={{ carrinho: data?.carrinho, adicionarItemCarrinho}}
    >
      {children}
    </carrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(carrinhoContext)
}

export default CarrinhoProvider