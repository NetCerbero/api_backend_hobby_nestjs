import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as requestIp from '@supercharge/request-ip';

export const IpAddress = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //return req.clientIp ?? 'not_found';
    return requestIp.getClientIp(request) ?? 'not_found';
  },
);
