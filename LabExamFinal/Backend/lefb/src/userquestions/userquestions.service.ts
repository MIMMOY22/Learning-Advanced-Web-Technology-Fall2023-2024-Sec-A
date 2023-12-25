import { Injectable,ConflictException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserQuestionDto } from 'src/userquestions/dto/create-user-question.dto';
import { UserQuestion } from 'src/entites/userquestion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserQuestionDto } from 'src/userquestions/dto/update-user-question.dto';

@Injectable()
export class UserquestionService {

  constructor(@InjectRepository(UserQuestion) private readonly userquestionRepo: Repository<UserQuestion>,
              ){}

   async create(createUserQuestionDto: CreateUserQuestionDto): Promise<UserQuestion> {
    const existingQuestion = await this.userquestionRepo.findOne({
        where: [{ question: createUserQuestionDto.question } ],});
      if (existingQuestion) {
        throw new ConflictException('Question already answered');
      }   
    const uq = this.userquestionRepo.create(createUserQuestionDto);
   

    return await this.userquestionRepo.save(uq);
  }

 
async findAll() {
  return await this.userquestionRepo.find();
}

async findOneById(id: number){
    return await this.userquestionRepo.findOne({ where: { id:id} });
}

async countTotalQuestions(){
    return await this.userquestionRepo.count();
}




async update(id: number, updateUserQuestionDto: UpdateUserQuestionDto){
  const userQuestion = await this.userquestionRepo.findOne({
      where: { id:id},
  });

  if (!userQuestion) {
      throw new NotFoundException(`Question with id #${id} not found for the user`);
  }

  await this.userquestionRepo.update(id, updateUserQuestionDto);
  return `The question with id #${id} has been updated`;
}


  

}
