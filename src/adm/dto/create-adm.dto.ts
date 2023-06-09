import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateAdmDto {
  @Transform(() => uuidv4())
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
    minUppercase: 0,
    minNumbers: 0,
  })
  password: string;
}
