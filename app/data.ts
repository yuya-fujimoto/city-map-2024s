////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from 'match-sorter';

type CityData = {
  id: 'nyc' | 'sf';
  title: string;
};

const CITY_DATA: CityData[] = [
  {
    id: 'nyc',
    title: 'NYC Tree Data 2015',
  },
  {
    id: 'sf',
    title: 'SF Tall Buildings 2024',
  },
];

export async function getCityData(query?: string | null) {
  if (query) {
    return matchSorter(CITY_DATA, query, {
      keys: ['id'],
    });
  }
  return CITY_DATA;
}

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
// export async function getContacts(query?: string | null) {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   let contacts = await fakeContacts.getAll();
//   if (query) {
//     contacts = matchSorter(contacts, query, {
//       keys: ['first', 'last'],
//     });
//   }
//   return contacts.sort(sortBy('last', 'createdAt'));
// }
