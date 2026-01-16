import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Roles } from '../Decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    try {
      if (roles.length == 0) return true;
      // Get Token from req header
      const token = context
        .switchToHttp()
        .getRequest()
        .headers?.authorization?.split(' ')[1];
      // if token is not found denied user
      if (!token) {
        return false;
      }
      // Check Token
      const user = this.jwtService.verify(token, {
        secret: process.env.PASSWORD_SECRET,
      });
      // if Cant decode user and token is invalid denied user
      if (!user) {
        return false;
      }
      // if user role is not in roles denied user
      if (!roles.includes(user.role)) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
