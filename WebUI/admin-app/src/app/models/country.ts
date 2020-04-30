export interface ICountriesVm {
  countries: ICountry[];
}

export interface ICountry {
  id: number;
  name: string;
  cities: ICity[];
}

interface ICity {
  id: number;
  name: string;
  sportObjects: ISportObject[];
}

interface ISportObject {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}
