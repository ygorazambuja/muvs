import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { decode, JwtPayload, verify } from 'jsonwebtoken';

export const AuthGuard = createParamDecorator((data, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();

  const { headers } = request;

  const { authorization } = headers;

  if (!authorization) {
    throw new ForbiddenException('Authorization header is required');
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    throw new BadRequestException('No token provided');
  }

  if (verify(token, process.env.SECRET)) {
    const { user } = decode(token, {}) as JwtPayload;

    return user;
  }

  return new BadRequestException('Invalid token');
});
