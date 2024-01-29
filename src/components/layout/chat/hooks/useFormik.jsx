import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useSupportFormik = (sendMessage) => {
	const [error, setError] = useState('');
	const [requestPeriod] = useState(3000);
	const [lastSubmitTime, setLastSubmitTime] = useState(0);

	const PERIOD_ERROR = `Send only once per ${requestPeriod / 1000} seconds`;

	const validationSchema = Yup.object().shape({
		message: Yup.string().required('Required'),
	});

	const formik = useFormik({
		initialValues: {
			message: '',
		},
		validationSchema: validationSchema,
		validateOnMount: true,
		onSubmit: () => {
			const currentTime = Date.now();

			if (currentTime >= lastSubmitTime + requestPeriod) {
				setError('');
				sendMessage(formik.values.message);
				formik.resetForm();
				formik.setSubmitting(false);
				setLastSubmitTime(currentTime);
			} else {
				setError(PERIOD_ERROR);
			}
		},
	});

	return {
		formik,
		error,
	};
};

export default useSupportFormik;
