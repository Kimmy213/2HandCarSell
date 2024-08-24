import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import CarList from './pages/Carlist';
import Welcome from './pages/Welcome';  // Import the Welcome component
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set the basename to '/car-analys'
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <div>404 not Found</div>,
      children: [
        {
          path: '/',
          element: <Welcome />,  // Set Welcome as the default page
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/Hightlight',
          element: <HighlightedCars />,
        },
        {
          path: '/Car',
          element: <CarList />,
        }

      ],
    },
  ],
  {
    basename: '/car-analys',
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
