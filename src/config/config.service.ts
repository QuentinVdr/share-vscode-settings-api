import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigDocument } from './config.model';

@Injectable()
export class ConfigService {
  constructor(@InjectModel(ConfigDocument.name) private configDocumentModel: Model<ConfigDocument>) {}

  async create(config: ConfigDocument): Promise<ConfigDocument> {
    const createdDocument = new this.configDocumentModel({
      config,
      createdAt: new Date(),
    });
    return createdDocument.save();
  }

  async findById(id: string): Promise<ConfigDocument> {
    return this.configDocumentModel.findById(id).exec();
  }
}
