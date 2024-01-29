import { useEffect } from 'react';
import Header4 from '../../components/header/Header4';
import DataBg from '../../components/layout/DataBg';
import useFormik from './hooks/useFormik';
import useRecover from '../../hooks/useRecover';
import MessageDialogService from '../../services/message-dialog.service';

export default function Forgot() {
  const { loading, error, recoverLink } = useRecover();
  const formik = useFormik();

  const handleSubmit = (e) => {
    if (!loading) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (recoverLink) {
      MessageDialogService.showSuccess('Recovery link is sent to email');
    }
  }, [recoverLink]);

  useEffect(() => {
    if (error) {
      MessageDialogService.showError(error);
    }
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
                  <h3 className="title">Recover your account</h3>
                  <span>👋 Welcome back! Please enter your details.</span>
                  <form action="#">
                    <div className="form-grp">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formik.values.email}
                        onChange={(e) =>
                          formik.setFieldValue('email', e.target.value)
                        }
                        error={formik.errors.email}
                      />
                    </div>
                    <button
                      type="submit"
                      className="sine-btn"
                      onClick={handleSubmit}
                    >
                      recover
                    </button>
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
