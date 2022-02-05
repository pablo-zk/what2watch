export interface User {
  _username: string;
  _password: string;
}
export enum UserState {
  Waiting = 0,
  Validated = 1,
  Rejected = 2,
}
