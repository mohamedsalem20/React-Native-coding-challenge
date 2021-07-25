import {client} from '../GraphqlHelper';

export function filterListByName(loading, fetchMore, namequeryHolder) {
  if (!loading) {
    client.clearStore().then(() => {
      fetchMore({
        variables: {
          charactersFilter: {name: namequeryHolder},
        },
      })
        .then(() => {
          return false;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  return false;
}

export function hasNextPage(data: {characters: {info: {next: number}}}) {
  if (data.characters.info.next) {
    return true;
  }
  return false;
}
