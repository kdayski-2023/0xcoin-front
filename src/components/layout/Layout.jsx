import { useEffect, useState } from 'react';
import Header1 from '../header/Header1';
import DataBg from './DataBg';
import Footer1 from '../footer/Footer1';
import GoTop from './GoTop';
import Header2 from '../header/Header2';
import Footer2 from '../footer/footer2';
import Header3 from '../header/Header3';
import Footer3 from '../footer/Footer3';
import Breadcrumb from './Breadcrumb';
import Header4 from '../header/Header4';
import LoginRightContent from './login/LoginRightContent';
// import ChatWidget from './chat/ChatWidget';
// import MessageDialog from '../MessageDialog/MessageDialog';

const Layout = ({
  headerStyle,
  footerStyle,
  headTitle,
  breadcrumbTitle,
  children,
  mainCls,
  login,
}) => {
  const [scroll, setScroll] = useState(0);

  // Moblile Menu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add('mobile-menu-visible')
      : document.body.classList.remove('mobile-menu-visible');
  };
  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });

    const WOW = require('wowjs');
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (login) {
    return (
      <>
        <DataBg />
        <Header4 />
        <main className="main-content">
          <div
            className="noise-bg"
            data-background="/assets/img/bg/noise_bg.png"
          />
          <div
            className="main-shape"
            data-background="/assets/img/images/main_shape.png"
          />
          <section className="login-area">
            <div className="container">
              <div className="row justify-content-center">
                {children}
                <LoginRightContent />
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
  return (
    <>
      {/* <MessageDialog /> */}
      {!headerStyle && (
        <Header1
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
        />
      )}
      {headerStyle === 1 ? (
        <Header1
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
        />
      ) : null}
      {headerStyle === 2 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
        />
      ) : null}
      {headerStyle === 3 ? (
        <Header3
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
        />
      ) : null}

      <DataBg />

      <main className={mainCls ? mainCls : 'main-content'}>
        <div
          className="noise-bg"
          data-background="/assets/img/bg/noise_bg.png"
        />
        <div
          className="main-shape"
          data-background="/assets/img/images/main_shape.png"
        />
        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

        {children}
      </main>
      {!footerStyle && <Footer1 />}
      {footerStyle === 1 ? <Footer1 /> : null}
      {footerStyle === 2 ? <Footer2 /> : null}
      {footerStyle === 3 ? <Footer3 /> : null}

      <GoTop />
    </>
  );
};
export default Layout;
