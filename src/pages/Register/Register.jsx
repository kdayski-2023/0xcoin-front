import { useEffect, useState } from 'react';
import useFormik from './hooks/useFormik';
import useRegister from '../../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SCREEN } from '../../admin/configs/screens.config';
import MessageDialogService from '../../services/message-dialog.service';
import Layout from '../../components/layout/Layout';

export default function Register() {
  const navigate = useNavigate();

  const { loading, error, sessionToken } = useRegister();
  const formik = useFormik();

  const [checkbox, setCheckbox] = useState(false);
  const handleChange = async (field, value) => {
    await formik.setFieldValue(field, value, false);
    await formik.validateField(field);
  };

  const handleSubmit = (e) => {
    if (!loading) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  // const handlePasswordReset = (e) => {
  //   e.preventDefault();
  //   navigate(FORGOT_PASSWORD_SCREEN);
  // };

  useEffect(() => {
    if (sessionToken) {
      navigate(ADMIN_SCREEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  useEffect(() => {
    if (error) {
      MessageDialogService.showError(error);
    }
  }, [error]);

  return (
    <Layout login>
      <div className="col-lg-5 col-md-10">
        <div className="login-content">
          <h3 className="title">Create your account</h3>
          <span>👋 Welcome back! Please enter your details.</span>
          <form action="#">
            <div className="form-grp">
              <label htmlFor="username">Name</label>
              <input
                type="username"
                id="username"
                value={formik.values.username}
                onChange={(e) => handleChange('username', e.target.value)}
                error={formik.errors.username}
              />
              {formik.errors.username && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    marginTop: '5px',
                    display: 'block',
                    position: 'absolute',
                  }}
                  className="error-message"
                >
                  {formik.errors.username}
                </span>
              )}
            </div>
            <div className="form-grp">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={formik.values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={formik.errors.email}
              />
              {formik.errors.email && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    marginTop: '5px',
                    display: 'block',
                    position: 'absolute',
                  }}
                  className="error-message"
                >
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div className="form-grp">
              <label htmlFor="word">Password</label>
              <input
                type="password"
                id="word"
                value={formik.values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={formik.errors.password}
              />
              {formik.errors.password && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    marginTop: '5px',
                    display: 'block',
                    position: 'absolute',
                  }}
                  className="error-message"
                >
                  {formik.errors.password}
                </span>
              )}
            </div>
            <div
              className="form-grp checkbox-grp"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type="checkbox"
                id="isLicenseAccepted"
                className="form-check-input"
                onChange={() => {
                  const newCheckboxValue = !checkbox;
                  setCheckbox(newCheckboxValue);
                  handleChange('isLicenseAccepted', newCheckboxValue);
                }}
              />
              <label htmlFor="isLicenseAccepted">
                Accept the license agreement
              </label>
              {formik.errors.isLicenseAccepted && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    marginTop: '37px',
                    display: 'block',
                    position: 'absolute',
                  }}
                  className="error-message"
                >
                  {formik.errors.isLicenseAccepted}
                </span>
              )}
            </div>
            {/* <div className="password-wrap">
                      <div className="form-grp checkbox-grp">
                        <input
                          type="checkbox"
                          id="checkbox"
                          className="form-check-input"
                        />
                        <label htmlFor="checkbox">Remember for 30 days</label>
                      </div>
                      <button onClick={handlePasswordReset}>
                        Forgot Password
                      </button>
                    </div> */}
            <button type="submit" className="sine-btn" onClick={handleSubmit}>
              sign in
            </button>
            {/* <button type="submit" className="google-btn">
                      <img src="assets/img/images/google.png" alt="" /> sign in
                      with google
                    </button> */}
            <span>
              Do you have an account?{' '}
              <div
                className="link-btn__custom"
                onClick={() => navigate('/login')}
              >
                Log in
              </div>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
}
