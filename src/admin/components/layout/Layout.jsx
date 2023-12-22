import '../../assets/2.2/App/resources/css/app.min.css';
import '../../assets/2.2/App/resources/vendors/zwicon/zwicon.min.css';
import '../../index.css';

import { Outlet } from 'react-router-dom';
import Header from '../shared/header/Header';
import Navigation from '../shared/navigation/Navigation';
import SideBar from '../shared/sideBar/SideBar';
import MessageDialog from '../../../components/MessageDialog/MessageDialog';

const Layout = () => {
  return (
    <main className="main">
      <MessageDialog />
      <Header className="header">
        <Navigation />
      </Header>
      <SideBar />
      <Outlet />
    </main>
  );
};

export default Layout;
