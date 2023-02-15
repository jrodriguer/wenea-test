export interface AuthResponseData {
  kind: string;
  idToken: string;
  localId: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean;
}
