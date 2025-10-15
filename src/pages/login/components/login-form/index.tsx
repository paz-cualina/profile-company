'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { routes } from '../../../../routes/routes';
import { ToastEnum } from '../../../../types/enum/toast.enum';
import { useToast } from '../../../../context/toast-context';
import LoginFooter from '../remember-forgot-actions';
import Button from '../../../../components/button';
import IconGoogle from '../../../../components/icons/icon-google';
import styles from './index.module.css';

export default function LoginForm() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const payload = { email: values.email, password: values.password };
      console.log('Submitting login with payload:', payload);

      // Simulation of login process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate(routes.home);
    } catch (error) {
      console.error('Login failed:', error);
      showToast(ToastEnum.error, 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIconEye = () => {
    setIsPassVisible(!isPassVisible);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const initialValues = { email: '', password: '' };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<Record<keyof typeof initialValues, string>> = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      <Form className={styles.formLogin}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            type="email"
            placeholder="example@domain.com"
            name="email"
            autoComplete="email"
            ref={inputRef}
          />
          <ErrorMessage name="email" component="span" className={styles.errorMessage} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            type={isPassVisible ? 'text' : 'password'}
            placeholder="************"
            name="password"
            autoComplete="current-password"
          />
          <span className={styles.iconPassword} onClick={toggleIconEye}>
            {isPassVisible ? (
              <FontAwesomeIcon icon={faEye} color="lightgrey" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} color="lightgrey" />
            )}
          </span>
          <ErrorMessage name="password" component="span" className={styles.errorMessage} />
        </div>
        <LoginFooter />

        <div className={styles.actions}>
          <Button
            disabled={isLoading}
            text={isLoading ? 'Signing in...' : 'Sign In'}
            width="full"
            type="submit"
          />
          <span className={styles.divider}></span>
          <button disabled={isLoading} className={styles.googleButton}>
            <IconGoogle width="18" height="18" />
            <span>Sign In with Google</span>
          </button>
        </div>
      </Form>
    </Formik>
  );
}
