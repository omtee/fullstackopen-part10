import { useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { SIGNIN } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  let history = useHistory();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGNIN);

  const signIn = async ({ username, password }) => {
    const promise = await mutate({ variables: { credentials: { username, password }}});
    await authStorage.setAccessToken(promise.data.authorize.accessToken);
    apolloClient.resetStore();
    history.push("/");
    return promise;
  };

  return [signIn, result];
};

export default useSignIn;