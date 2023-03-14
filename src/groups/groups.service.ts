import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly database: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.database.group.create({
      data: {
        name: createGroupDto.name,
      },
    });
    //return 'This action adds a new group';
  }

  async findAll() {
    return this.database.group.findMany();
    //return `This action returns all groups`;
  }

  async findOne(id: string) {
    await this.exists(id);

    return this.database.group.findUnique({
      where: {
        id,
      },
    });
    //return `This action returns a #${id} group`;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    await this.exists(id);

    return this.database.group.update({
      where: {
        id,
      },
      data: {
        name: updateGroupDto.name,
      },
    });
    //return `This action updates a #${id} group`;
  }

  async remove(id: string) {
    await this.exists(id);

    return this.database.group.delete({ where: { id } });
    //return `This action removes a #${id} group`;
  }

  async exists(id: string) {
    if (
      !(await this.database.group.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
