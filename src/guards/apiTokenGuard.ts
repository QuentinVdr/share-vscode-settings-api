import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    Logger.log(`🚀 ~ ApiTokenGuard ~ canActivate ~ token: ${token}`);
    const validToken = this.configService.get<string>('API_TOKEN');
    Logger.log(`🚀 ~ ApiTokenGuard ~ canActivate ~ validToken: ${validToken}`);

    if (!token || token !== validToken) {
      throw new UnauthorizedException('Invalid API token');
    }

    return true;
  }
}
