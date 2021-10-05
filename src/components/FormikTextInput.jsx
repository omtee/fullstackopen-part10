import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.mainBG,
  },
  errorText: {
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyle = [
    styles.textInput,
    showError && { borderColor: theme.colors.error }
  ];

  return (
    <>
      <TextInput
        style={inputStyle}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text color='error' style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;