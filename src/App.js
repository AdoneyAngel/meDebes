import './styles/App.css';
import router from './router.js';
import { RouterProvider } from 'react-router-dom';

//Components

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
