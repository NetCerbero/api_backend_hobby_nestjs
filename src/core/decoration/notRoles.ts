import { SetMetadata } from '@nestjs/common';
import { Rol } from '../rol/rol';

export const NOT_ROLES_KEY = 'not_roles';
export const NotRoles = (...roles: Rol[]) => SetMetadata(NOT_ROLES_KEY, roles);
