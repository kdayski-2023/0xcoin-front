import { notifications } from '../../../shared/data/header.data';
import SearchBar from '../../ui/searchBar/SearchBar';
import Logo from '../../../assets/2.2/App/resources/img/logo.png';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="admin-navigation-trigger admin-d-xl-none"
        data-sa-action="admin-aside-open"
        data-sa-target=".admin-sidebar"
      >
        <i className="admin-zwicon-hamburger-menu"></i>
      </div>

      <div className="admin-logo admin-d-none admin-d-sm-inline-flex">
        <div onClick={() => navigate('/')}>
          <img style={{cursor: "pointer"}} src={Logo} alt={''} width={120} />
        </div>
      </div>

      <SearchBar />

      <ul className="admin-top-nav">
        <li className="admin-d-xl-none">
          <a href="#" data-sa-action="admin-search-open">
            <i className="admin-zwicon-search"></i>
          </a>
        </li>

        <li className="admin-dropdown admin-top-nav__notifications">
          <a
            href="#"
            data-toggle="admin-dropdown"
            className="admin-top-nav__notify"
          >
            <i className="admin-zwicon-bell"></i>
          </a>
          <div className="admin-dropdown-menu admin-dropdown-menu-right admin-dropdown-menu--block">
            <div className="admin-dropdown-header">
              Notifications
              <div className="admin-actions">
                <a
                  href="#"
                  className="admin-actions__item admin-zwicon-checkmark-square"
                  data-sa-action="admin-notifications-clear"
                >
                  /
                </a>
              </div>
            </div>

            <div className="admin-listview admin-listview--hover">
              <div className="admin-listview__scroll admin-scrollbar">
                {notifications.map((notification) => (
                  <a
                    href="#"
                    className="admin-listview__item"
                    key={notification.id}
                  >
                    <img
                      src={notification.source}
                      className="admin-avatar-img"
                      alt=""
                    />

                    <div className="admin-listview__content">
                      <div className="admin-listview__heading">
                        {notification.text}
                      </div>
                      <p>{notification.paragraph}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </li>

        <li className="admin-dropdown admin-d-none admin-d-sm-inline-block">
          <a href="#" data-toggle="admin-dropdown">
            <i className="admin-zwicon-more-h"></i>
          </a>

          <div className="admin-dropdown-menu admin-dropdown-menu-right">
            <a href="#" className="admin-dropdown-item">
              Logout
            </a>
            <a href="#" className="admin-dropdown-item">
              Settings
            </a>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
