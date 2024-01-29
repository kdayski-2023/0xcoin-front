import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegisterService from '../../../services/register.service';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
    .required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  isLicenseAccepted: Yup.boolean()
    .nullable()
    .required('License is required!')
    .oneOf([true], 'You must accept the license agreement!'),
});

const useRegisterFormik = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      isLicenseAccepted: false,
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      // console.log(values);
      await RegisterService.register(values);
    },
  });

  return formik;
};

export default useRegisterFormik;
