import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import User from './components/User';
import RandomMovie from './pages/Random_movie';

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
{
  /* User */
}
