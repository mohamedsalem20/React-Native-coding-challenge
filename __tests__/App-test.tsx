import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CharactersList from '../app/Screens/characterList/CharactersList';

it('renders correctly', () => {
  renderer.create(<CharactersList namequeryHolder={''} />);
});
