import { useEffect } from 'react';
import useFormik from './hooks/useFormik';
import useRecover from '../../hooks/useRecover';
import MessageDialogService from '../../services/message-dialog.service';
import Layout from '../../components/layout/Layout';

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
    <Layout login>
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
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                error={formik.errors.email}
              />
            </div>
            <button type="submit" className="sine-btn" onClick={handleSubmit}>
              recover
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
