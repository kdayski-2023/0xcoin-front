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
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'inherit',
            }}
            data-sa-action="admin-search-open"
          >
            <i className="admin-zwicon-search"></i>
          </button>
        </li>

        <li className="admin-dropdown admin-top-nav__notifications">
          <button
            type="button"
            data-toggle="admin-dropdown"
            className="admin-top-nav__notify"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            <i className="admin-zwicon-bell"></i>
          </button>
          <div className="admin-dropdown-menu admin-dropdown-menu-right admin-dropdown-menu--block">
            <div className="admin-dropdown-header">
              Notifications
              <div className="admin-actions">
                <button
                  type="button"
                  className="admin-actions__item admin-zwicon-checkmark-square"
                  data-sa-action="admin-notifications-clear"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                  }}
                >
                  /
                </button>
              </div>
            </div>

            <div className="admin-listview admin-listview--hover">
              <div className="admin-listview__scroll admin-scrollbar">
                {notifications.map((notification) => (
                  <button
                    type="button"
                    className="admin-listview__item"
                    key={notification.id}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: 'inherit',
                      font: 'inherit',
                    }}
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        </li>

        <li className="admin-dropdown admin-d-none admin-d-sm-inline-block">
          <button
            type="button"
            data-toggle="admin-dropdown"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            <i className="admin-zwicon-more-h"></i>
          </button>

          <div className="admin-dropdown-menu admin-dropdown-menu-right">
            <button
              type="button"
              className="admin-dropdown-item"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
              }}
            >
              Logout
            </button>
            <button
              type="button"
              className="admin-dropdown-item"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
              }}
            >
              Settings
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
