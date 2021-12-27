import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma-service';

import { hash, compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signUp(createUserDto) {
    const hasUser = await this.getUserByUsername(createUserDto.username);
    if (hasUser) throw new BadRequestException('User already exists');

    const hasEmail = await this.getUserByEmail(createUserDto.email);
    if (hasEmail) throw new BadRequestException('Email already exists');

    const { username, email, password, name } = createUserDto;
    const encryptedPassword = await encryptPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: encryptedPassword,
        name,
      },
    });

    delete newUser.password;

    return {
      user: newUser,
      token: genJWT(newUser),
    };
  }

  async getUserByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        movieLists: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async signIn(body) {
    const { username, password } = body;

    const user = await this.getUserByUsername(username);

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    delete user.password;
    delete user.movieLists;

    return {
      user,
      token: genJWT(user),
    };
  }
}

const encryptPassword = async (password: string) => hash(password, 10);

const comparePassword = async (password: string, encryptedPassword: string) =>
  await compare(password, encryptedPassword);

const genJWT = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return sign(
    {
      user,
      exp: exp.getTime() / 1000,
    },
    process.env.SECRET
  );
};
