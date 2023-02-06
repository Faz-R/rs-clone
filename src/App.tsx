import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import MainPage from './pages/MainPage/index';
import Quiz from './pages/quiz';
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
        index: true,
        path: 'quiz',
        element: <Quiz />,
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
