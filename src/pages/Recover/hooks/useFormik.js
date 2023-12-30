import { useFormik } from 'formik';
import * as Yup from 'yup';
import RecoverService from '../../../services/recover.service';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const useRecoverFormik = () => {
  const formik = useFormik({
    initialValues: {
      hash: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      await RecoverService.recover(values);
    },
  });

  return formik;
};

export default useRecoverFormik;
