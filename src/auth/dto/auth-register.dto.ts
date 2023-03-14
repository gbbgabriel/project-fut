import { IntersectionType } from '@nestjs/mapped-types';
import { CreateAdmDto } from 'src/adm/dto/create-adm.dto';

export class AuthRegisterDTO extends IntersectionType(CreateAdmDto) {}
