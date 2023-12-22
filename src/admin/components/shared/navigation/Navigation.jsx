import { notifications } from '../../../shared/data/header.data';
import SearchBar from '../../ui/searchBar/SearchBar';

const Navigation = () => {
  return (
    <>
      <div
        className="navigation-trigger d-xl-none"
        data-sa-action="aside-open"
        data-sa-target=".sidebar"
      >
        <i className="zwicon-hamburger-menu"></i>
      </div>

      <div className="logo d-none d-sm-inline-flex">
        <a href="index.html">Super Admin 2.0</a>
      </div>

      <SearchBar />

      <ul className="top-nav">
        <li className="d-xl-none">
          <a href="" data-sa-action="search-open">
            <i className="zwicon-search"></i>
          </a>
        </li>

        <li className="dropdown top-nav__notifications">
          <a href="" data-toggle="dropdown" className="top-nav__notify">
            <i className="zwicon-bell"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu--block">
            <div className="dropdown-header">
              Notifications
              <div className="actions">
                <a
                  href=""
                  className="actions__item zwicon-checkmark-square"
                  data-sa-action="notifications-clear"
                ></a>
              </div>
            </div>

            <div className="listview listview--hover">
              <div className="listview__scroll scrollbar">
                {notifications.map((notification) => (
                  <a href="" className="listview__item" key={notification.id}>
                    <img
                      src={notification.source}
                      className="avatar-img"
                      alt=""
                    />

                    <div className="listview__content">
                      <div className="listview__heading">
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

        <li className="dropdown d-none d-sm-inline-block">
          <a href="" data-toggle="dropdown">
            <i className="zwicon-more-h"></i>
          </a>

          <div className="dropdown-menu dropdown-menu-right">
            <a href="" className="dropdown-item">
              Logout
            </a>
            <a href="" className="dropdown-item">
              Settings
            </a>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
