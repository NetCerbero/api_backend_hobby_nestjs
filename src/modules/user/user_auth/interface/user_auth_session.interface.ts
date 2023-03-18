export interface IUserAuthSession {
  userId: string;
  sessionId: string;
  email: string;
  displayName: string;
  permissions: string[];
  tenantId?: any;
  type: string;
}

export interface IJwtPayload {
  sessionId: string;
  userId: string;
  email: string;
  displayName: string;
  iat: number;
  exp: number;
}
