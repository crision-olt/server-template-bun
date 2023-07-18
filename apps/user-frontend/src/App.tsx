import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './features/auth/routes/Login'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Login/>
    </QueryClientProvider>
  )
}

export default App
