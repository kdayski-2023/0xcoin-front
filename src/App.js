import { Route, Routes } from 'react-router-dom';

import routes from './pages/index';
import { useEffect, useState } from 'react';
import Preloader from './components/preloader/Preloader';
import {
  ADMIN_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  REGISTER_SCREEN,
} from './admin/configs/screens.config';
import AOS from 'aos';

import Layout from './admin/components/layout/Layout';
import Main from './admin/components/screens/main/Main';
import Register from './admin/components/screens/register/Register';
import useSession from './hooks/useSession';
import Forgot from './pages/Forgot/Forgot';

function App() {
  const [loading, setLoading] = useState(true);
  const { sessionToken } = useSession();
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {!loading ? (
        <Routes>
          {routes.map((data, index) => (
            <Route
              exact={true}
              path={data.path}
              element={data.component}
              key={index}
            />
          ))}
          {/* <Route path='*' element={<Page404 />} /> */}
          <Route path={`${FORGOT_PASSWORD_SCREEN}`} element={<Forgot />} />
          {/* <Route path={`${LOGIN_SCREEN}`} element={<Login />} /> */}
          <Route path={`${REGISTER_SCREEN}`} element={<Register />} />
          {sessionToken && (
            <Route path={`${ADMIN_SCREEN}`} element={<Layout />}>
              <Route index element={<Main />} />
            </Route>
          )}
        </Routes>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default App;
