import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '@pages/main';
import MainPage from '@pages/MainPage/index';
import Humor from '@pages/HumorPage';
import RandomMovie from '@pages/Random_Movie';
import SearchPage from '@pages/SearhPage';
import ErrorPage from '@pages/ErrorPage';
import MovieDetails from '@pages/Movie';
import loaderMovieDetails from '@api/loaderMovieDetails';

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
        path: 'movies/:id',
        element: <MovieDetails />,
        loader: loaderMovieDetails,
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
