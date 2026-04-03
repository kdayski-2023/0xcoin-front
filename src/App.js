import { Route, Routes } from 'react-router-dom';

import routes from './pages/index';
import { useEffect } from 'react';
import Preloader from './components/preloader/Preloader';
import {
  ADMIN_SCREEN,
  FORGOT_PASSWORD_SCREEN,
} from './admin/configs/screens.config';

import Layout from './admin/components/layout/Layout';
import Main from './admin/components/screens/main/Main';
import useSession from './hooks/useSession';
import Forgot from './pages/Forgot/Forgot';
import MessageDialog from './components/MessageDialog/MessageDialog';
import ContentServiceInstance from 'services/content.service';

function App() {
  const { sessionToken } = useSession();

  useEffect(() => {
    ContentServiceInstance.getContent();
  }, []);

  return (
    <>
      <MessageDialog />
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
        {/* <Route path={`${REGISTER_SCREEN}`} element={<Register />} /> */}
        {sessionToken && (
          <Route path={`${ADMIN_SCREEN}`} element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
        )}
      </Routes>
      <Preloader />
    </>
  );
}

export default App;
