import { useFormik, FormikProvider } from 'formik';
import RegisterFormBody from './registerFormBody/RegisterFormBody';
import RegisterFormHeader from './registerFormHeader/RegisterFormHeader';
import { initialValuesRegister } from './initialValues';
import { RegisterValidationSchema } from '../../../shared/validations/auth.validate';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SCREEN } from '../../../configs/screens.config';
import RegisterService from '../../../../services/register.service';
import useRegister from '../../../../hooks/useRegister';
import { useEffect } from 'react';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { error, loading, sessionToken } = useRegister();

  const formik = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (values.isLicenseAccepted) {
        await RegisterService.register(values);
      } else {
        formik.setFieldError('isLicenseAccepted', 'Accept license, try again!');
      }
    },
  });

  useEffect(() => {
    if (sessionToken) {
      navigate(ADMIN_SCREEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="login">
        <div className="login__block active" id="l-register">
          <RegisterFormHeader />
          <RegisterFormBody
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

export default RegisterForm;
