import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FORGOT_PASSWORD_SCREEN,
  REGISTER_SCREEN,
} from '../../../../configs/screens.config';

const LoginFormHeader = () => {
  const [isDropdownShown, setDropdownShown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setDropdownShown(!isDropdownShown);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-login__block__header">
      <i className="admin-zwicon-user-circle"></i>
      Hi there! Please Sign in
      <div className="admin-actions actions--inverse admin-login__block__actions">
        <div
          ref={dropdownRef}
          className={`admin-dropdown ${isDropdownShown ? 'admin-show' : ''}`}
        >
          <i
            onClick={toggleDropDown}
            data-toggle="admin-dropdown"
            className="admin-zwicon-more-h admin-actions__item"
          ></i>

          <div
            className={`admin-dropdown-menu admin-dropdown-menu-right ${
              isDropdownShown ? 'admin-show' : ''
            }`}
          >
            <Link
              className="admin-dropdown-item"
              data-sa-action="admin-login-switch"
              data-sa-target="#l-login"
              to={REGISTER_SCREEN}
            >
              Create an account
            </Link>
            <Link
              className="admin-dropdown-item"
              data-sa-action="admin-login-switch"
              data-sa-target="#l-forget-password"
              to={FORGOT_PASSWORD_SCREEN}
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormHeader;
