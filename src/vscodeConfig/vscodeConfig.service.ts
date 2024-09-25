import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VscodeConfig } from './vscodeConfig.model';

@Injectable()
export class VscodeConfigService {
  private readonly logger = new Logger(VscodeConfigService.name);

  constructor(@InjectModel(VscodeConfig.name) private vscodeConfigModel: Model<VscodeConfig>) {}

  async create(vscodeConfig: VscodeConfig): Promise<VscodeConfig> {
    const createdDocument = new this.vscodeConfigModel(vscodeConfig);
    const result = await createdDocument.save();
    this.logger.log(`Created VscodeConfig with ID: ${result._id.toString()}`);
    return result;
  }

  async findById(id: string): Promise<VscodeConfig> {
    const result = await this.vscodeConfigModel.findById(id).exec();
    if (result) {
      this.logger.log(`Found VscodeConfig: ${JSON.stringify(result)}`);
    } else {
      this.logger.warn(`VscodeConfig with ID: ${id} not found`);
    }
    return result;
  }

  async findAll(): Promise<VscodeConfig[]> {
    const result = await this.vscodeConfigModel.find().exec();
    this.logger.log(`Found ${result.length} VscodeConfigs`);
    return result;
  }

  async delete(id: string) {
    const result = await this.vscodeConfigModel.findByIdAndDelete(id).exec();
    if (result) {
      this.logger.log(`Deleted VscodeConfig with ID: ${id}`);
    } else {
      this.logger.warn(`VscodeConfig with ID: ${id} not found`);
    }
  }
}
