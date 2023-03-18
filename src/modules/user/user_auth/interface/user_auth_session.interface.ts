export interface IUserAuthSession {
  userId: string;
  sessionId: string;
  email: string;
  displayName: string;
  permission: string[];
  tenantId?: any;
  branchId?: any;
  isAdmin: boolean;
}

export interface IJwtPayload {
  sessionId: string;
  userId: string;
  email: string;
  displayName: string;
  iat: number;
  exp: number;
}
