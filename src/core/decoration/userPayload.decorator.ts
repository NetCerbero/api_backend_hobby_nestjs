import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserAuthSession } from 'src/modules/user/user_auth/interface/user_auth_session.interface';
export const UserPayload = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return user as IUserAuthSession;
  },
);