import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../../services/login.service';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const useLoginFormik = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      await LoginService.login(values);
    },
  });

  return formik;
};

export default useLoginFormik;
