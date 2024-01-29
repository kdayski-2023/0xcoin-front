import '../../assets/2.2/App/resources/css/app.min.css';
import '../../assets/2.2/App/resources/vendors/zwicon/zwicon.min.css';
import '../../index.css';

import { Outlet } from 'react-router-dom';
import Header from '../shared/header/Header';
import Navigation from '../shared/navigation/Navigation';
import SideBar from '../shared/sideBar/SideBar';
import MessageDialog from '../shared/messageDialog/MessageDialog';
import ChatWidget from '../../../components/layout/chat/ChatWidget';

const Layout = () => {
  return (
    <main className="admin-main">
      <MessageDialog />
      <ChatWidget />
      <Header className="admin-header">
        <Navigation />
      </Header>
      <SideBar />
      <Outlet />
    </main>
  );
};

export default Layout;
