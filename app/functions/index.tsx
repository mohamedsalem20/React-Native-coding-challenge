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

export function hasNext(data) {
  return data.characters.info.next;
}
