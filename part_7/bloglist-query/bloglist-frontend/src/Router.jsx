import { createBrowserRouter } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Users from './pages/Users';
import Blog from './pages/Blog';
import User from './pages/User';

export const router = createBrowserRouter([
  {
    path: '/',
      element: <Home />,
  },
  {
    path: '/blogs',
      element: <Home />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/blogs/:id',
    element: <Blog />,
  },
  {
    path: '/users/:id',
    element: <User />,
  }
]);