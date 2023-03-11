import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const UserPayload = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return user;
  },
);