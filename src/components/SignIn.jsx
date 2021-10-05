import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  signInForm: {
    backgroundColor: 'white',
    padding: 10,
  },
  signInButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text color='tag' fontWeight='bold'>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    if ((username !== '') && (password !== '')) {
      console.log(`username: ${username} password: ${password}`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;