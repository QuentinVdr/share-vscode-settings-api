import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ConfigDocument extends Document {
  @Prop()
  settings: string;

  @Prop()
  extensionIds: string[];

  @Prop({ expires: '1w' })
  createdAt: Date;
}

export const ConfigDocumentSchema = SchemaFactory.createForClass(ConfigDocument);
