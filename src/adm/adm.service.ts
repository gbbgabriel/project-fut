import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdmDto } from './dto/create-adm.dto';
import { UpdateAdmDto } from './dto/update-adm.dto';

@Injectable()
export class AdmService {
  constructor(private readonly database: PrismaService) {}

  async create(createAdmDto: CreateAdmDto) {
    return this.database.adm.create({
      data: {
        name: createAdmDto.name,
        email: createAdmDto.email,
        password: createAdmDto.password,
      },
    });
    //return 'This action adds a new adm';
  }

  async findAll() {
    return this.database.adm.findMany();
    //return `This action returns all adm`;
  }

  async findOne(id: string) {
    await this.exists(id);

    return this.database.adm.findUnique({
      where: {
        id,
      },
    });
    //return `This action returns a #${id} adm`;
  }

  async update(id: string, updateAdmDto: UpdateAdmDto) {
    await this.exists(id);

    return this.database.adm.update({
      where: {
        id,
      },
      data: {
        name: updateAdmDto.name,
        email: updateAdmDto.email,
        password: updateAdmDto.password,
      },
    });
    //return `This action updates a #${id} adm`;
  }

  async remove(id: string) {
    await this.exists(id);

    return this.database.adm.delete({ where: { id } });
    //return `This action removes a #${id} adm`;
  }

  async exists(id: string) {
    if (
      !(await this.database.adm.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
