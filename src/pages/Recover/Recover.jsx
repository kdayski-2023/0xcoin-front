import { useEffect } from 'react';
import Header4 from '../../components/header/Header4';
import DataBg from '../../components/layout/DataBg';
import useFormik from './hooks/useFormik';
import { useNavigate, useParams } from 'react-router-dom';
import { LOGIN_SCREEN } from '../../admin/configs/screens.config';
import useRecover from '../../hooks/useRecover';
import MessageDialogService from '../../services/message-dialog.service';


export default function Recover() {
  const { hash } = useParams();
  const navigate = useNavigate();
  const { loading, error, success } = useRecover();
  const formik = useFormik();

  const handleSubmit = async (e) => {
    if (!loading) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (success) navigate(LOGIN_SCREEN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    // if (error) alert(error);
    if (error) {
      MessageDialogService.showError(error);
    }
  }, [error]);

  useEffect(() => {
    if (hash) formik.setFieldValue('hash', hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

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
                  <h3 className="title">Reset your password</h3>
                  <span>👋 Welcome back! Please enter your details.</span>
                  <form action="#">
                    <div className="form-grp">
                      <label htmlFor="word">Password</label>
                      <input
                        type="password"
                        id="word"
                        value={formik.values.password}
                        onChange={(e) =>
                          formik.setFieldValue('password', e.target.value)
                        }
                        error={formik.errors.password}
                      />
                    </div>
                    <button
                      type="submit"
                      className="sine-btn"
                      onClick={handleSubmit}
                    >
                      Reset
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
