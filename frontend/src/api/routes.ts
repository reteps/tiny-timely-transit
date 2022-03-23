import { BusRoute, BusStation } from 'types/Bus';

// todo: use actual api endpoint
const ENDPOINT = '#';

export async function getAllBusRoutes(): Promise<BusRoute[]> {
  // how it would look once we have an api endpoint
  /*
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
  */
  return [
    {
      id: '1',
      name: 'Yellow',
      color: '#ff0',
    },
    {
      id: '22',
      name: 'Illini',
      color: '#5420b5',
    },
    {
      id: '13',
      name: 'Silver',
      color: '#c0c0c0',
    },
  ];
}


export async function _getAllStations(): Promise<BusStation[]> {
  return [
    {
      name: 'Bus Stop 1',
      lat: 40.117434,
      long: -88.233839,
      id: '1',
      buses: [],
    },
    {
      name: 'Bus Stop 2',
      lat: 40.110444,
      long: -88.238665,
      id: '2',
      buses: [],
    },
    {
      name: 'Bus Stop 3',
      lat: 40.105396,
      long: -88.232558,
      id: '3',
      buses: [],
    },
  ]
}

export async function _getStationStatistics(): Promise<BusStation[]> {
  return [];
}

export async function _getStationHistoricalData(fromUtc: number, toUtc: number): Promise<BusStation[]> {
  return [];
}
