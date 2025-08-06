import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
            cacheTime: 1000 * 60 * 10,
            retry: 2 
        }
    }
})

createRoot(document.getElementById('root')).render(
    
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <BrowserRouter>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </BrowserRouter>
        </AuthProvider>
    </QueryClientProvider>
)
