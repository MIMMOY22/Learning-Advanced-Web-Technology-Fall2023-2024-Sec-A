// auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserManagementService } from 'src/user-management/user-management.service';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [
    UserManagementModule,
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' }, // Adjust as needed
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserManagementService],
  controllers: [AuthController],
})
export class AuthModule {}
