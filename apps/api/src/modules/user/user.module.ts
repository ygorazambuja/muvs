import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma-service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule {}
