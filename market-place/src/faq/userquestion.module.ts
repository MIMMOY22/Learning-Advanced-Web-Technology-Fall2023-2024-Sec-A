import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuestion } from 'src/entities/userquestion.entity';
import { UserquestionController } from './userquestion.controller';
import { UserquestionService } from './userquestion.service';
import { AuthService } from 'src/auth/auth.service';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
    imports:[TypeOrmModule.forFeature([UserQuestion])],
    controllers: [UserquestionController],
    providers: [UserquestionService],
    //exports:[TypeOrmModule],
})
export class UserquestionModule {}
