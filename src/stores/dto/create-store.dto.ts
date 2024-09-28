import { IsNotEmpty, IsString } from 'class-validator';

import { AddressDto } from 'src/users/dto/create.users.dto';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  Address: AddressDto;
}
