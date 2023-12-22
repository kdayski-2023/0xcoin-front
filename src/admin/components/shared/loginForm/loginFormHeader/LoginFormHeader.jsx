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
    <div className="login__block__header">
      <i className="zwicon-user-circle"></i>
      Hi there! Please Sign in
      <div className="actions actions--inverse login__block__actions">
        <div
          ref={dropdownRef}
          className={`dropdown ${isDropdownShown ? 'show' : ''}`}
        >
          <i
            onClick={toggleDropDown}
            data-toggle="dropdown"
            className="zwicon-more-h actions__item"
          ></i>

          <div
            className={`dropdown-menu dropdown-menu-right ${
              isDropdownShown ? 'show' : ''
            }`}
          >
            <Link
              className="dropdown-item"
              data-sa-action="login-switch"
              data-sa-target="#l-login"
              to={REGISTER_SCREEN}
            >
              Create an account
            </Link>
            <Link
              className="dropdown-item"
              data-sa-action="login-switch"
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
