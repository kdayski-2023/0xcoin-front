import { ErrorMessage, Field } from 'formik';
import License from '../../../ui/license/License';
import RegisterFormFooter from '../registerFormFooter/RegisterFormFooter';

const RegisterFormBody = ({ errors, touched, isSubmitting, values }) => {
  return (
    <div className="admin-login__block__body">
      <div className="admin-form-group">
        <Field
          id="username"
          value={values.username}
          type="text"
          name="username"
          className={`form-grp admin-form-control admin-text-center${
            touched?.username && errors?.username ? ' admin-is-invalid' : ''
          }`}
          placeholder="Name"
        />
        <ErrorMessage
          name="username"
          component="div"
          className="admin-invalid-feedback"
        />
      </div>

      <div className="admin-form-group form-group--centered">
        <Field
          id="email"
          value={values.email}
          type="text"
          name="email"
          className={`admin-form-control text-center${
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

      <div className="admin-form-group form-group--centered">
        <Field
          id="password"
          value={values.password}
          type="password"
          name="password"
          className={`admin-form-control text-center${
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

      <License />
      <RegisterFormFooter isSubmitting={isSubmitting} />
    </div>
  );
};

export default RegisterFormBody;
