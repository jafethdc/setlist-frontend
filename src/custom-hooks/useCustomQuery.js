import { useQuery } from 'react-apollo-hooks';

const useCustomQuery = (...args) => {
  const result = useQuery(...args);
  if (result.error)
    throw new Error(result.error.message.replace('GraphQL error: ', ''));
  return result;
};

export default useCustomQuery;
