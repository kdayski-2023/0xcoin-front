import { useEffect } from 'react';
import Header4 from '../../components/header/Header4';
import DataBg from '../../components/layout/DataBg';
import useFormik from './hooks/useFormik';
import useLogin from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_SCREEN,
  FORGOT_PASSWORD_SCREEN,
} from '../../admin/configs/screens.config';

export default function Login() {
  const navigate = useNavigate();
  const { loading, error, sessionToken } = useLogin();
  const formik = useFormik();

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

  const handlePassrowdReset = (e) => {
    e.preventDefault();
    navigate(FORGOT_PASSWORD_SCREEN);
  };

  useEffect(() => {
    if (sessionToken) {
      navigate(ADMIN_SCREEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

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
              <div className="col-lg-5 col-md-10">
                <div className="login-content">
                  <h3 className="title">Create your account</h3>
                  <span>👋 Welcome back! Please enter your details.</span>
                  <form action="#">
                    <div className="form-grp">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formik.values.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={formik.errors.email}
                      />
                    </div>
                    <div className="form-grp">
                      <label htmlFor="word">Password</label>
                      <input
                        type="password"
                        id="word"
                        value={formik.values.password}
                        onChange={(e) =>
                          handleChange('password', e.target.value)
                        }
                        error={formik.errors.password}
                      />
                    </div>
                    <div className="password-wrap">
                      <div className="form-grp checkbox-grp">
                        <input
                          type="checkbox"
                          id="checkbox"
                          className="form-check-input"
                        />
                        <label htmlFor="checkbox">Remember for 30 days</label>
                      </div>
                      <button onClick={handlePassrowdReset}>
                        Forgot Password
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="sine-btn"
                      onClick={handleSubmit}
                    >
                      sign in
                    </button>
                    <button type="submit" className="google-btn">
                      <img src="assets/img/images/google.png" alt="" /> sign in
                      with google
                    </button>
                    <span>Don’t have an account? Sign up for free</span>
                  </form>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="login-right-content-wrap">
                  <div
                    className="login-right-bg"
                    data-background="assets/img/bg/error_bg.jpg"
                  />
                  <div className="login-right-content-inner">
                    <img src="assets/img/images/login_img.png" alt="" />
                    <h4 className="title">
                      Try <span>0xCoin today</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
