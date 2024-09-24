import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VscodeConfigController } from './vscodeConfig.controller';
import { VscodeConfig, VscodeConfigDocumentSchema } from './vscodeConfig.model';
import { VscodeConfigService } from './vscodeConfig.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: VscodeConfig.name, schema: VscodeConfigDocumentSchema }])],
  controllers: [VscodeConfigController],
  providers: [VscodeConfigService],
})
export class VscodeConfigModule {}
