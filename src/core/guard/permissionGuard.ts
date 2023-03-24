import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NOT_ROLES_KEY } from '../decoration/notRoles';
import { PERMISION_KEY } from '../decoration/permission';
import { IS_PUBLIC_KEY } from '../decoration/public';
import { ROLES_KEY } from '../decoration/role';
import { Rol } from '../rol/rol';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<Rol[]>(PERMISION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    // verify user permissions
    const { user } = context.switchToHttp().getRequest();
    
    if(!permissions) return true;

    return permissions.some( p => {
      return user.permissions.some(up => up === p);
    })
  }
}
