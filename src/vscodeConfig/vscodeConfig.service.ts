import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VscodeConfig } from './vscodeConfig.model';

@Injectable()
export class VscodeConfigService {
  constructor(@InjectModel(VscodeConfig.name) private vscodeConfigModel: Model<VscodeConfig>) {}

  async create(vscodeConfig: VscodeConfig): Promise<VscodeConfig> {
    const createdDocument = new this.vscodeConfigModel(vscodeConfig);
    return createdDocument.save();
  }

  async findById(id: string): Promise<VscodeConfig> {
    return this.vscodeConfigModel.findById(id).exec();
  }

  async findAll(): Promise<VscodeConfig[]> {
    return this.vscodeConfigModel.find().exec();
  }

  async delete(id: string) {
    this.vscodeConfigModel.findByIdAndDelete(id).exec();
  }
}
