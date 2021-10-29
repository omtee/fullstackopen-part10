import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const removeReview = async (id) => {
    const promise = await mutate({ variables: { id }});
    return promise;
  };

  return [removeReview, result];
};

export default useDeleteReview;