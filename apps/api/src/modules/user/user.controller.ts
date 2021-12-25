import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body) {
    return this.userService.signUp(body);
  }

  @Post('signin')
  async signIn(@Body() body) {
    return this.userService.signIn(body);
  }
}
