import "normalize.css"
import  AppRoutes  from "./routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from './utils/auth.jsx'; 
const queryClient = new QueryClient();
function App() {
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes/>
     </AuthProvider>
     </QueryClientProvider>
    </>
  )
}

export default App