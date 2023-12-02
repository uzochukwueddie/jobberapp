import { object, ObjectSchema, string } from 'yup';

import { IResetPassword, ISignInPayload, ISignUpPayload } from '../interfaces/auth.interface';

const loginUserSchema: ObjectSchema<ISignInPayload> = object({
  username: string().required({ username: 'Username is a required field' }).min(4, { username: 'Username is a required field' }),
  password: string().required({ password: 'Password is a required field' }).min(4, { password: 'Password is a required field' })
});

const registerUserSchema: ObjectSchema<ISignUpPayload> = object({
  username: string().required({ username: 'Username is a required field' }).min(4, { username: 'Username is a required field' }),
  password: string().required({ password: 'Password is a required field' }).min(4, { password: 'Password is a required field' }),
  email: string().email({ email: 'Email is a required field' }).required({ email: 'Email is a required field' }),
  country: string().notOneOf(['Select Country'], { country: 'Select a country' }).required({ country: 'Country is a required field' }),
  profilePicture: string().required({ profilePicture: 'Profile picture is a required field' })
});

const resetPasswordSchema: ObjectSchema<IResetPassword> = object({
  password: string().required({ password: 'Password is a required field' }).min(4, { password: 'Password is a required field' }),
  confirmPassword: string()
    .required({ confirmPassword: 'Confirm password is a required field' })
    .min(4, { password: 'Password is a required field' })
});

export { loginUserSchema, registerUserSchema, resetPasswordSchema };
