// import CharactersList from '../app/Screens/characterList/CharactersList';
// import {mocks} from './mocks';

// import TestRenderer from 'react-test-renderer';
// import {MockedProvider} from '@apollo/client/testing';

// export const mocks = [
//     {
//       data: {
//         characters: {
//           results: [
//             {
//               id: '241',
//               name: 'Mr. Marklovitz',
//               image: 'https://rickandmortyapi.com/api/character/avatar/241.jpeg',
//               species: 'Human',
//               gender: 'Male',
//               episode: [
//                 {
//                   name: 'M. Night Shaym-Aliens!',
//                   air_date: 'January 13, 2014',
//                 },
//                 {
//                   name: 'Get Schwifty',
//                   air_date: 'August 23, 2015',
//                 },
//               ],
//             },
//           ],
//           info: {next: null, count: 1},
//         },
//       },
//     },
//   ];

// !! TO SOLVE -->   ERR :  TypeError: Cannot read property 'query' of undefined >
// it('CharactersList renders without error', () => {
//   TestRenderer.create(
//     <MockedProvider mocks={mocks}>
//       <CharactersList namequeryHolder={'Marklovitz'} navigation={{}} />
//     </MockedProvider>,
//   );
//   const tree = component.toJSON();
//   expect(tree.children).toContain(<Loading />);
// });
export {};
