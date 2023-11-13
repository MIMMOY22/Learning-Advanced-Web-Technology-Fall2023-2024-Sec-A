// auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserManagementService } from 'src/user-management/user-management.service';
import * as bcrypt from 'bcrypt';
import { User, UserWithoutPassword } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)private readonly userRepo: Repository<User>,
    private readonly userService: UserManagementService,
    private readonly jwtService: JwtService,
  ) {}
 
  async validateUser(username: string, password: string): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findByUsername(username);

    if (user && (await bcrypt.compare(password, this.userRepo.password))) {
      const { password: _, ...result } = user as UserWithoutPassword;
      return result;
    }

    return null;
  }

  async login(user: UserWithoutPassword): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
