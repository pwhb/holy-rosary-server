import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}

// export const CurrentUser = createParamDecorator(
//   (data: unknown, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest()
//     return request['user']
//   },
// );
