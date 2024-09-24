import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VscodeConfigController } from './vscodeConfig.controller';
import { VscodeConfig, VscodeConfigSchema } from './vscodeConfig.model';
import { VscodeConfigService } from './vscodeConfig.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: VscodeConfig.name, schema: VscodeConfigSchema }])],
  controllers: [VscodeConfigController],
  providers: [VscodeConfigService],
})
export class VscodeConfigModule {}
