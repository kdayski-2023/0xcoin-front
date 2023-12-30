import { useFormik } from 'formik';
import * as Yup from 'yup';
import RecoverService from '../../../services/recover.service';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const useRecoverFormik = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      link: window.location.origin,
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      await RecoverService.getRecoverLink(values);
    },
  });

  return formik;
};

export default useRecoverFormik;
