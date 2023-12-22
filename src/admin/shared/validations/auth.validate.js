import { object, string, boolean } from 'yup';

export const RegisterValidationSchema = object({
  email: string()
    .email('incorrect Email format!')
    .required('Email is required!'),
  password: string().required('Password is required!'),
  username: string().required('Username is required!'),
  isLicenseAccepted: boolean()
    .required('License is required!')
    .oneOf([true], 'You must accept the license agreement!'),
});

export const LoginValidationSchema = object({
  email: string()
    .email('incorrect Email format!')
    .required('Email is required!'),
  password: string().required('Password is required!'),
});
