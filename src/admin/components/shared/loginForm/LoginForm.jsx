import { FormikProvider, useFormik } from 'formik';
import LoginFormBody from './loginFormBody/LoginFormBody';
import LoginFormHeader from './loginFormHeader/LoginFormHeader';
import { initialValuesLogin } from './initialValues';
import { LoginValidationSchema } from '../../../shared/validations/auth.validate';
import { login } from '../../../store/auth/auth.actions.js';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="admin-login">
        <div className="admin-login__block admin-active" id="l-login">
          <LoginFormHeader />
          <LoginFormBody
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            isSubmitting={formik.isSubmitting}
          />
        </div>
      </form>
    </FormikProvider>
  );
};

export default LoginForm;
