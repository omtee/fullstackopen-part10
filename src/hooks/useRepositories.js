import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', variables });

  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }

  return { repositories: data?.repositories, loading };
};

export default useRepositories;