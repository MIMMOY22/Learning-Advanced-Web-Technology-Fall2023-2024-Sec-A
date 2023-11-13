// auth/auth.controller.ts

import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Request() req) {
    // Implement user registration logic
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }
}
