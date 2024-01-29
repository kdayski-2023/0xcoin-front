import { useFormik } from 'formik';
import * as Yup from 'yup';
import ContactService from '../../../services/contact.service';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string(),
  description: Yup.string().required('Required'),
});

const useContactFormik = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      description: '',
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      await ContactService.contact(values);
    },
  });

  return formik;
};

export default useContactFormik;
