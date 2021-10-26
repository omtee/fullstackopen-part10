import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ ownerName, repositoryName, rating, text }) => {
    const promise = await mutate({ variables: { review: { ownerName, repositoryName, rating: Number(rating), text }}});
    return promise;
  };

  return [review, result];
};

export default useReview;