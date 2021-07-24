import {gql, InMemoryCache} from '@apollo/client';

export function loadMore(fetchMore, data, loading) {
  if (data.characters.info.next && !loading) {
    fetchMore({
      variables: {
        charactersPage: data.characters.info.next,
      },
    });
  }
}

export const GET_CHARACHTERS = gql`
  query Characters($charactersPage: Int, $charactersFilter: FilterCharacter) {
    characters(page: $charactersPage, filter: $charactersFilter) {
      results {
        id
        name
        image
        species
        gender
        episode {
          name
          air_date
        }
      }
      info {
        next
        count
      }
    }
  }
`;

export function FILTER_CHARACHTERSGQL(namequeryHolder: string) {
  const FILTER_CHARACHTERS = gql`
query {
  characters(filter: {name: "${namequeryHolder}"}) {
    results {
      id
      name
      image
      species
      gender
      episode{
        name
        air_date
      }
    }
    info {
      next
      count
    }
  }
}
`;

  return FILTER_CHARACHTERS;
}

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,
          merge(existing = [], incoming) {
            var mergeExistingIncoming;
            if (existing.results) {
              mergeExistingIncoming = [
                ...existing.results,
                ...incoming.results,
              ];
            } else {
              mergeExistingIncoming = [...incoming.results];
            }

            const resultHolder = {
              info: incoming.info,
              results: mergeExistingIncoming,
              __typename: incoming.__typename,
            };

            return resultHolder;
          },
        },
      },
    },
  },
});