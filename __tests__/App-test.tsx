import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {hasNextPage} from '../app/functions';
import CharachterDetails from '../app/Screens/charachterDetails/CharachterDetails';
import CharacterCard from '../app/Screens/characterList/CharacterCard';
import Loading from '../app/Screens/characterList/components/Loading';
import Error from '../app/Screens/characterList/components/Error';

it('render CharachterDetails correctly ✅', () => {
  renderer.create(
    <CharachterDetails
      route={{
        params: {
          image: 'test',
          name: 'test',
          moreInfo: {
            gender: 'test',
            species: 'test',
            episode: [{name: 'testo', air_date: 'test'}],
          },
        },
      }}
    />,
  );
});

// it('render CharachterDetails correctly ✅', () => {
//   renderer.create(<CharactersList namequeryHolder={'mark'} />);
// });

it('check if still charachters to fetch (for pagination), hasNextPage(2) returns true', () => {
  expect(hasNextPage({characters: {info: {next: 2}}})).toBe(true);
});

it('render CharachterCard correctly ', () => {
  renderer.create(
    <CharacterCard
      image="test"
      name="test"
      id={1}
      moreInfo={{
        species: 'test',
        gender: 'test',
        episode: [{air_date: 'test', name: 'test'}],
      }}
      navigation={{}}
    />,
  );
});

it('render Loading component correctly ', () => {
  renderer.create(<Loading />);
});

it('render Error component correctly ', () => {
  renderer.create(<Error />);
});
