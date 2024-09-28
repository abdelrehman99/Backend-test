import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  government: string;

  @IsNotEmpty()
  @IsString()
  firstLine: string;

  @IsNotEmpty()
  @IsString()
  secondLine: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  hashedPassword: string;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  address: AddressDto;
}

export default CreateUserDto;
