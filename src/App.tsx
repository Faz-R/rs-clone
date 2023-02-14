import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import MainPage from './pages/MainPage/index';
import Humor from './pages/HumorPage';
import RandomMovie from './pages/Random_Movie';
import SearchPage from './pages/SearhPage';
import ErrorPage from './pages/ErrorPage';
import Viewed from './pages/Viewed';
import WillView from '@pages/WillView';

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
        path: 'humor',
        element: <Humor />,
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
      {
        path: 'expect',
        element: <WillView />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
