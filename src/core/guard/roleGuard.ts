import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NOT_ROLES_KEY } from '../decoration/notRoles';
import { IS_PUBLIC_KEY } from '../decoration/public';
import { ROLES_KEY } from '../decoration/role';
import { Rol } from '../rol/rol';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredNotRoles = this.reflector.getAllAndOverride<Rol[]>(
      NOT_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    //copiando los rol por si existe sobre escritura en los que se definen en los controladores;
    const CPrequiredRoles = requiredRoles ? [...requiredRoles] : undefined;
    const CPrequiredNotRoles = requiredNotRoles
      ? [...requiredNotRoles]
      : undefined;
    if (!CPrequiredRoles && !CPrequiredNotRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
 /*    console.log("requiredRoles",requiredRoles);
    console.log("user",user) */
    if (CPrequiredNotRoles) {
      if (!CPrequiredRoles) {
        return !CPrequiredNotRoles.some((role) => {
          if (['string', 'number'].includes(typeof user.rol)) {
            return user.rol == role;
          }
          return user.rol.filter((r) => r == role).length > 0;
        });
      }
      CPrequiredNotRoles.forEach((e) => {
        const idx = CPrequiredRoles.findIndex((r) => r == e);
        if (idx > -1) {
          CPrequiredRoles.splice(idx, 1);
        }
      });
    }
    return CPrequiredRoles.some((role) => {
      if (['string', 'number'].includes(typeof user.rol)) {
        return user.rol == role;
      }
      return user.rol.filter((r) => r == role).length > 0;
    });
  }
}
