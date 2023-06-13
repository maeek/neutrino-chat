export interface User {
  username: string;
  password?: string;
  method: 'password' | 'webauthn';
}
