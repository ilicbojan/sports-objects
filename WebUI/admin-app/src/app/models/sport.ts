export interface ISportsVm {
  sports: ISport[];
}

export interface ISport {
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
  city: ICity;
}

interface ICity {
  id: number;
  name: string;
  country: ICountry;
}

interface ICountry {
  id: number;
  name: string;
}
