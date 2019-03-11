import gql from 'graphql-tag';
import useQuery from './useCustomQuery';

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      username
      email
    }
  }
`;

const useCurrentUser = () => {
  const { data, error, loading } = useQuery(ME_QUERY);
  return error || loading ? null : data.me;
};

export default useCurrentUser;
