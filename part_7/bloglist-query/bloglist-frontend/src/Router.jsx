import { createBrowserRouter } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Users from './pages/Users';
import Blog from './pages/Blog';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/blogs/:id',
    element: <Blog />,
  }
]);