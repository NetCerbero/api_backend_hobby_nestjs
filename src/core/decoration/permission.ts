import { SetMetadata } from '@nestjs/common';

export const PERMISION_KEY = 'permission';
export const Permission = (...permissions: string[]) => SetMetadata(PERMISION_KEY, permissions);
