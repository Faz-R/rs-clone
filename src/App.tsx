import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import RandomMovie from './pages/Random_Movie/Random_movie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <RandomMovie />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
