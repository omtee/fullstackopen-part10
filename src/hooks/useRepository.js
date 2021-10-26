import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  if (error) {
    throw new Error(`${error.name}: ${error.message}`);
  }

  return { repository: data?.repository, loading };
};

export default useRepository;