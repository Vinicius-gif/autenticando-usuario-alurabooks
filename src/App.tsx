import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import './App.css';
import Rotas from './rotas';

import { createBrowserHistory } from 'history'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ABapolloClient from './componentes/ABapolloClient';

export const history = createBrowserHistory({ window })

const queryClient = new QueryClient();

function App() {
  return (
    <ABapolloClient>
      <QueryClientProvider client={queryClient}>
        <HistoryRouter history={history}>
          <Rotas />
        </HistoryRouter>
      </QueryClientProvider>
    </ABapolloClient>
  );
}

export default App;
