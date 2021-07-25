import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {hasNextPage} from '../app/functions';
import CharachterDetails from '../app/Screens/charachterDetails/CharachterDetails';
import CharactersList from '../app/Screens/characterList/CharactersList';

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

it('given if still charachters to fetch (for pagination), hasNextPage() returns true', () => {
  expect(hasNextPage({characters: {info: {next: 2}}})).toBe(true);
});
