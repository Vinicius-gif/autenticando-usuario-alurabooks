import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './rotas';

import { createBrowserHistory } from 'history'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ABapolloClient from './componentes/ABapolloClient';
import CarrinhoProvider from './contextApi/carrinho';

export const history = createBrowserHistory({ window })

const queryClient = new QueryClient();

function App() {
  return (
    <ABapolloClient>
      <CarrinhoProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </QueryClientProvider>
      </CarrinhoProvider>
    </ABapolloClient>
  );
}

export default App;
