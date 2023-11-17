import { Injectable,ConflictException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { UserQuestion } from 'src/entities/userquestion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserQuestionDto } from './dto/update-user-question.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user-management/dto/create-user.dto';
import { request } from 'http';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserquestionService {

  constructor(@InjectRepository(UserQuestion) private readonly userquestionRepo: Repository<UserQuestion>,
              ){}

   async create(createUserQuestionDto: CreateUserQuestionDto, userId: number): Promise<UserQuestion> {
    const existingQuestion = await this.userquestionRepo.findOne({
        where: [{ question: createUserQuestionDto.question } ],});
      if (existingQuestion) {
        throw new ConflictException('Question already answered');
      }   
    //const uq = this.userquestionRepo.create(createUserQuestionDto);
    const uq = this.userquestionRepo.create({
      ...createUserQuestionDto,
      user: { id: userId }, // Set the user ID here
  });

    return await this.userquestionRepo.save(uq);
  }

  async findAllByUser(userId: number): Promise<UserQuestion[]> {
    return await this.userquestionRepo.find({
        where: { user: { id: userId } },
    });
}

async findOneByUser(id: number, userId: number): Promise<UserQuestion> {
    return await this.userquestionRepo.findOne({ where: { id, user: { id: userId } } });
}

async countTotalQuestionsByUser(userId: number): Promise<number> {
    return await this.userquestionRepo.count({ where: { user: { id: userId } } });
}

async update(id: number, updateUserQuestionDto: UpdateUserQuestionDto, userId: number): Promise<string> {
  const userQuestion = await this.userquestionRepo.findOne({
      where: { id, user: { id: userId } },
  });

  if (!userQuestion) {
      throw new NotFoundException(`Question with id #${id} not found for the user`);
  }

  await this.userquestionRepo.update(id, updateUserQuestionDto);
  return `The question with id #${id} has been updated`;
}


  // async delete(id: number) {
  //   await this.userquestionRepo.delete(id);
  //   return `This Question of id #${id} has been deleted`;
  // }

  // async countTotalQuestions() {
  //   return await this.userquestionRepo.count();
    
  // }
  // async getUserById(id: number) {
  //   return await this.userRepo.findOne({where: {id:id},
  //                                        relations:{questions:true}});
 // }
  

}
