import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/queries';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    const promise = await mutate({ variables: { user: { username, password }}});
    return promise;
  };

  return [signUp, result];
};

export default useSignUp;