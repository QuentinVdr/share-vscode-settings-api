import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getNodeEnv } from 'src/utils/environmentUtils';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const nodeEnv = getNodeEnv(this.configService);
    const request = context.switchToHttp().getRequest();
    const path = request.url;

    if (path === '/') {
      return true; // Bypass API key check for health check
    }

    if (nodeEnv === 'production') {
      const apiKey = request.header('X-API-Key');
      const validApiKey = this.configService.get<string>('API_KEY');

      if (!apiKey || apiKey !== validApiKey) {
        throw new UnauthorizedException('Invalid API key');
      }
    }

    return true;
  }
}
