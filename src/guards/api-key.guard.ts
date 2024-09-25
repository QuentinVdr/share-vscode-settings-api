import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('X-API-Key');
    console.log('🚀 ~ ApiKeyGuard ~ canActivate ~ apiKey:', apiKey);
    const validApiKey = this.configService.get<string>('API_KEY');
    console.log('🚀 ~ ApiKeyGuard ~ canActivate ~ validApiKey:', validApiKey);

    if (!apiKey || apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
