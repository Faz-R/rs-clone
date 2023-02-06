import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import MainPage from './pages/MainPage/index';
import SearchPage from './pages/SearhPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
