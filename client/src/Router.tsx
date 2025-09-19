import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NothingFoundBackground } from './components/404/NothingFoundBackground';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NothingFoundBackground />, // Handle 404 errors
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}