export interface JwtPayload {
  sub: number; // User ID
  username: string;
  fullname: string;
  roleId: number;
  iat?: number;
  exp?: number;
}
