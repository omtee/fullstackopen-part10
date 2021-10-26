import React from 'react';
import { useHistory } from 'react-router-dom';
import { StyleSheet, View, Pressable } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';
import useReview from '../hooks/useReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const styles = StyleSheet.create({
  reviewForm: {
    backgroundColor: 'white',
    padding: 10,
  },
  reviewButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number('Rating must be a number')
    .integer('Rating must be an integer')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.reviewForm}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" testID="ownerNameField" />
      <FormikTextInput name="repositoryName" placeholder="Repository name"  testID="repositoryNameField" />      
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100"  testID="ratingField" />      
      <FormikTextInput name="text" placeholder="Review"  testID="textField" />
      <Pressable style={styles.reviewButton} onPress={onSubmit} testID="submitButton">
        <Text color='tag' fontWeight='bold'>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  let history = useHistory();
  const [review] = useReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const promise = await review({ ownerName, repositoryName, rating, text });
      const repositoryId = promise?.data.createReview.repositoryId;
      history.push(`/view/${repositoryId}`);
    } catch (e) {
      console.log('error', e);
      history.push('/');
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;