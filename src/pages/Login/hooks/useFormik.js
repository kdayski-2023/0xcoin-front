import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../../services/login.service';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
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
      console.log(values);
      await LoginService.login(values);
    },
  });

  return formik;
};

export default useLoginFormik;
