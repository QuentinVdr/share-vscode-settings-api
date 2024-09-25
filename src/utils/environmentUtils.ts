import { ConfigService } from '@nestjs/config';

export const getNodeEnv = (configService: ConfigService) => {
  return configService.get<string>('NODE_ENV') || 'development';
};
