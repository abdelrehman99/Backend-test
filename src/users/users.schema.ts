import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Transform, Exclude } from 'class-transformer';
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class Address {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  government: string;

  @Prop({ required: true })
  @IsString()
  firstLine: string;

  @Prop({ required: true })
  @IsString()
  secondLine: string;
}

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @Prop({ required: true })
  @IsString()
  firstName: string;

  @Prop({ required: true })
  @IsString()
  lastName: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true, unique: true })
  @IsPhoneNumber()
  phone: string;

  @Prop({ required: true })
  @Exclude()
  hashedPassword: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop()
  address?: Address;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});

export { UserSchema };
