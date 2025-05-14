import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DataHelper } from 'adapter/helper/data.helper';
import { IAuthService } from 'auth/auth.service.interface';
import { IJwtPayload } from 'domain/interface';
import { Staff } from 'domain/model/staff.model';
import { Request } from 'express';

export const _extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

@Injectable()
export class StaffGuard implements CanActivate {
  private readonly logger = new Logger();

  constructor(
    private authService: IAuthService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    try {
      const token = _extractTokenFromHeader(request);
      if (token) {
        const payload: IJwtPayload = await this._getPayload(token);
        const user = await this._validate(payload);
        request['user'] = user;
        if (!user) {
          throw new UnauthorizedException();
        }
        return true;
      }
      throw new UnauthorizedException();
    } catch (error) {
      this.logger.error(
        error.message,
        'ERROR::UserGuard -> status ' + error.status,
      );
      if (error.status === 401) {
        throw error;
      }
      return false;
    }
  }

  private async _getPayload(token: string): Promise<IJwtPayload> {
    const { iat, exp, ...rest } = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
      ignoreExpiration: process.env.NODE_ENV === 'prod' ? false : true,
    });
    return rest;
  }

  private async _validate(payload: IJwtPayload): Promise<Staff | undefined> {
    if (!DataHelper.isEmpty(payload)) {
      return await this.authService.search({
        ...payload,
        isActivated: true,
      });
    }
    return undefined;
  }
}
