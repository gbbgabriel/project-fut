import { IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Transform } from 'class-transformer';

export class CreateGroupDto {
  @Transform(() => uuidv4())
  id: string;

  @IsString()
  name: string;
}
