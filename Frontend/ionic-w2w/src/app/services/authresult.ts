export interface AuthResult {
  //u: username
  u?: string;
  //r: role
  r?: string;
  token: string;
  expires_at?: string;
}
