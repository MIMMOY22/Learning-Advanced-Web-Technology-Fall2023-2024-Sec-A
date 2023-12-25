import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes,ValidationPipe, UseGuards, Req, Session} from '@nestjs/common';
import { UserquestionService } from './userquestions.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { UpdateUserQuestionDto } from './dto/update-user-question.dto';

@Controller('userquestion')

export class UserquestionController {
  constructor(private readonly userquestionService: UserquestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createUserQuestionDto: CreateUserQuestionDto) {
    
    return this.userquestionService.create(createUserQuestionDto);
  }

  @Get('seeall')
  findAll() {
    return this.userquestionService.findAll();
  }
      

  @Get('find/:id')
  findOne(@Param('id') id: number) {
      
      return this.userquestionService.findOneById(id);
  }


  @Get('count/totalquestions')
  async countTotalQuestions() {
      
      const totalQuestions = await this.userquestionService.countTotalQuestions();
      return `The total questions you created are: ${totalQuestions}`;
  }




@Put('update/:id')
update(@Param('id') id: number, @Body() updateUserQuestionDto: UpdateUserQuestionDto) {
    return this.userquestionService.update(id, updateUserQuestionDto);
}


}
