export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
}

export interface DriversResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
  drivers: Driver[];
}
