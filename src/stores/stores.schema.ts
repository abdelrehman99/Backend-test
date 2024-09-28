import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Address } from 'src/users/users.schema';

export type StoreDocument = Store & Document;

// @Schema()
// class Ratings {
//   @Prop({ default: 0 })
//   average: number;

//   @Prop({ default: 0 })
//   totalRatings: number;

//   @Prop({ default: 0 })
//   numberOfRaters: number;
// }

// @Schema()
// class Reviews {
//   @Prop({ required: true })
//   @IsString()
//   userName: string;

//   @Prop({ required: true })
//   @IsString()
//   government: string;

//   @Prop({ required: true })
//   @IsString()
//   firstLine: string;

//   @Prop({ required: true })
//   @IsString()
//   secondLine: string;
// }

@Schema()
export class Store {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  type: string;

  @Prop({ required: true })
  @IsString()
  Description: string;

  @Prop({ required: true })
  Address: Address;
}

const StoreSchema = SchemaFactory.createForClass(Store);

export { StoreSchema };
