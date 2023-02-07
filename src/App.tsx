import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import MainPage from './pages/MainPage/index';
import Quiz from './pages/quiz';
import RandomMovie from './pages/Random_Movie/Random_movie';
import SearchPage from './pages/SearhPage';
import ErrorPage from './pages/ErrorPage';
import Viewed from './pages/Viewed';

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
      {
        path: 'random',
        element: <RandomMovie />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        path: 'viewed',
        element: <Viewed />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
