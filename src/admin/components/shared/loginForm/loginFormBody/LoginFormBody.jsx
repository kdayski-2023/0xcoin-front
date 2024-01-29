import { ErrorMessage, Field } from 'formik';
import LoginFormFooter from '../loginFormFooter/LoginFormFooter';

const LoginFormBody = ({ values, errors, touched, isSubmitting }) => {
  return (
    <div className="admin-login__block__body">
      <div className="admin-form-group admin-form-group--centered">
        <Field
          id="email"
          value={values.email}
          type="text"
          name="email"
          className={`admin-form-control admin-text-center${
            touched?.email && errors?.email ? ' admin-is-invalid' : ''
          }`}
          placeholder="Email Address"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="admin-invalid-feedback"
        />
      </div>

      <div className="admin-form-group admin-form-group--centered">
        <Field
          id="password"
          value={values.password}
          type="password"
          name="password"
          className={`admin-form-control admin-text-center${
            touched?.password && errors?.password ? ' admin-is-invalid' : ''
          }`}
          placeholder="Password"
        />
        <ErrorMessage
          name="password"
          component="div"
          className="admin-invalid-feedback"
        />
      </div>

      <LoginFormFooter isSubmitting={isSubmitting} />
    </div>
  );
};

export default LoginFormBody;
