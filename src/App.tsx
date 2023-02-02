import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import User from './components/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <User />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
