export interface ICitiesVm {
  cities: ICity[];
}

export interface ICity {
  id: number;
  name: string;
  countryId: number;
  country: ICountry;
  sportObjects: ISportObject[];
}

interface ICountry {
  id: number;
  name: string;
}

interface ISportObject {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}
