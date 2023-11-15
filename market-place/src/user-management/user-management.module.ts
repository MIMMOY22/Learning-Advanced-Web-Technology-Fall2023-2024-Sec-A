import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([User])],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
