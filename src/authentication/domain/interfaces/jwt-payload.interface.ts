export interface JwtPayload {
  sub: number; // User ID
  username: string;
  roleId: number;
  iat?: number;
  exp?: number;
}
