import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VscodeConfigModule } from './vscodeConfig/vscodeConfig.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    VscodeConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
