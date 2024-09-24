import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VscodeConfigDocument = VscodeConfig & Document;

@Schema()
export class VscodeConfig {
  @Prop({ type: String })
  settings?: string;

  @Prop({ required: true, type: [String] })
  extensionIds: string[];

  @Prop({ default: Date.now, expires: '1w' })
  createdAt: Date;
}

export const VscodeConfigDocumentSchema = SchemaFactory.createForClass(VscodeConfig);
