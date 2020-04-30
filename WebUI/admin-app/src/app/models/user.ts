export interface IUser {
  username: string;
  token: string;
  roles: string[];
}

export interface IUserFormValues {
  email: string;
  password: string;
}
