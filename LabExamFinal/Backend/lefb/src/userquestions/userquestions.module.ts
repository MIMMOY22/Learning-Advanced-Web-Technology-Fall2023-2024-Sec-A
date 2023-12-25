import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuestion } from 'src/entites/userquestion.entity';
import { UserquestionController } from './userquestions.controller';
import { UserquestionService } from './userquestions.service';



@Module({
    imports:[TypeOrmModule.forFeature([UserQuestion])],
    controllers: [UserquestionController],
    providers: [UserquestionService],
    
})
export class UserquestionModule {}
