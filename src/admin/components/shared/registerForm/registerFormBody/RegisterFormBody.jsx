import { ErrorMessage, Field } from 'formik';
import License from '../../../ui/license/License';
import RegisterFormFooter from '../registerFormFooter/RegisterFormFooter';

const RegisterFormBody = ({ errors, touched, isSubmitting, values }) => {
  return (
    <div className="login__block__body">
      <div className="form-group">
        <Field
          id="username"
          value={values.username}
          type="text"
          name="username"
          className={`form-control text-center${
            touched?.username && errors?.username ? ' is-invalid' : ''
          }`}
          placeholder="Name"
        />
        <ErrorMessage
          name="username"
          component="div"
          className="invalid-feedback"
        />
      </div>

      <div className="form-group form-group--centered">
        <Field
          id="email"
          value={values.email}
          type="text"
          name="email"
          className={`form-control text-center${
            touched?.email && errors?.email ? ' is-invalid' : ''
          }`}
          placeholder="Email Address"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="invalid-feedback"
        />
      </div>

      <div className="form-group form-group--centered">
        <Field
          id="password"
          value={values.password}
          type="password"
          name="password"
          className={`form-control text-center${
            touched?.password && errors?.password ? ' is-invalid' : ''
          }`}
          placeholder="Password"
        />
        <ErrorMessage
          name="password"
          component="div"
          className="invalid-feedback"
        />
      </div>

      <License />
      <RegisterFormFooter isSubmitting={isSubmitting} />
    </div>
  );
};

export default RegisterFormBody;
