import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VscodeConfig extends Document {
  @Prop({
    required: true,
    type: [String],
    validate: [
      {
        validator: (v: string[]) => v.every((item) => item.length <= 100),
        message: 'Each item in the array must not exceed 100 characters',
      },
      {
        validator: (v: string[]) => v.length <= 100,
        message: 'The array must not exceed 100 items',
      },
    ],
  })
  extensionIds: string[];

  @Prop({ default: Date.now, expires: '1w' })
  createdAt: Date;
}

export const VscodeConfigSchema = SchemaFactory.createForClass(VscodeConfig);
