import { Injectable,ConflictException } from '@nestjs/common';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { UserQuestion } from 'src/entities/userquestion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserQuestionDto } from './dto/update-user-question.dto';
@Injectable()
export class UserquestionService {

  constructor(@InjectRepository(UserQuestion) private readonly userquestionRepo: Repository<UserQuestion>){}

   async create(createUserQuestionDto: CreateUserQuestionDto) {
    const existingQuestion = await this.userquestionRepo.findOne({
        where: [
          { question: createUserQuestionDto.question },
          
        ],
      });
  
      if (existingQuestion) {
        throw new ConflictException('Question already answered');
      }
    const uq = await this.userquestionRepo.create(createUserQuestionDto);
    return await this.userquestionRepo.save(uq);
  }

  async findAll() {
    return await this.userquestionRepo.find();
  }

  async findOne(id: number) {
    return await this.userquestionRepo.findOne({where: {id:id}});
  }

  async update(id: number, updateUserQuestionDto: UpdateUserQuestionDto) {
    await this.userquestionRepo.update(id, updateUserQuestionDto);
    return `This Question of id #${id} has been updated`;
  }

  async delete(id: number) {
    await this.userquestionRepo.delete(id);
    return `This Question of id #${id} has been deleted`;
  }

  async countTotalQuestions() {
    return await this.userquestionRepo.count();
    
  }
}
