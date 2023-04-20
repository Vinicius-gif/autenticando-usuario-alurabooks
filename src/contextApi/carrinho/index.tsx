import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useAdicionarItem, useCarrinho, useRemoverItem } from "../../graphql/Carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho ";

export interface ICarrinhoContext {
  carrinho?: ICarrinho
  adicionarItemCarrinho: (item: IItemCarrinho) => void
  removerItemCarrinho: (item: IItemCarrinho) => void
  carregando: boolean
}

export const carrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
  removerItemCarrinho: () => null,
  carregando: false
})

interface CarrinhoProviderProps {
  children: ReactElement
}

const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {

  const {data, loading: loadingCarrinho} = useCarrinho()

  const [adcionaItem, {loading: loadingAdiciona}] = useAdicionarItem()
  const [removerItem] = useRemoverItem()

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

  const removerItemCarrinho = (item: IItemCarrinho) => {
    removerItem({
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
      value={{ 
        carrinho: data?.carrinho, 
        adicionarItemCarrinho, 
        removerItemCarrinho,
        carregando: loadingCarrinho || loadingAdiciona
      }}
    >
      {children}
    </carrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(carrinhoContext)
}

export default CarrinhoProvider