import './styles/App.css';
import router from './router.js';
import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LocalData from './model/localData.js';

//Classes
import User from './model/User.js';

//Components
import FullScreenLoading from './components/FullScreenLoading.jsx';

function App() {

  const [fullScreenLoading, setFullScreenLoading] = useState(true)

  useEffect(() => {

    if(!LocalData.isLogged() && (router.state.location.pathname != "/access" && router.state.location.pathname !== "/access/login" && router.state.location.pathname !== "/access/signup")) {
      router.navigate("/access")
    }
  })

  const showFullScreenLoading = () => {
    setFullScreenLoading(true)
  }

  return (
    <>
      {fullScreenLoading ? <FullScreenLoading /> : null}
      <RouterProvider router={router}/>
    </>
    
  );
}

export default App;
