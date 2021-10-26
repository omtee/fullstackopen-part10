import React from 'react';
import { useHistory } from 'react-router-dom';
import { StyleSheet, View, Pressable } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const styles = StyleSheet.create({
  SignUpForm: {
    backgroundColor: 'white',
    padding: 10,
  },
  SignUpButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username length must be between 1 and 30')
    .max(30, 'Username length must be between 1 and 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Username length must be between 5 and 50')
    .max(50, 'Username length must be between 5 and 50')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirm is required')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.SignUpForm}>
      <FormikTextInput name="username" placeholder="Username" testID="usernameField" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="passwordField" />
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry testID="passwordConfirmField" />
      <Pressable style={styles.SignUpButton} onPress={onSubmit} testID="submitButton">
        <Text color='tag' fontWeight='bold'>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  let history = useHistory();
  const [SignUp] = useSignUp();
  const [SignIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await SignUp({ username, password });
      await SignIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;