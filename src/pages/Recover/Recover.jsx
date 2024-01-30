import { useEffect } from 'react';
import useFormik from './hooks/useFormik';
import { useNavigate, useParams } from 'react-router-dom';
import { LOGIN_SCREEN } from '../../admin/configs/screens.config';
import useRecover from '../../hooks/useRecover';
import MessageDialogService from '../../services/message-dialog.service';
import Layout from '../../components/layout/Layout';

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
    <Layout login>
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
            <button type="submit" className="sine-btn" onClick={handleSubmit}>
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
