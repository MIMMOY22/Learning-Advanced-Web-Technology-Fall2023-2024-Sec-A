import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes,ValidationPipe, UseGuards, Req, Session} from '@nestjs/common';
import { UserquestionService } from './userquestion.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { AuthUserGuard } from 'src/auth/authuser.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserQuestionDto } from './dto/update-user-question.dto';

@Controller('userquestion')
@UseGuards(AuthUserGuard)
export class UserquestionController {
  constructor(private readonly userquestionService: UserquestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createUserQuestionDto: CreateUserQuestionDto,@Session() session) {
    const userId = session.userId; // Get user ID from the session
    return this.userquestionService.create(createUserQuestionDto,userId);
  }

  @Get('seeall')
  findAll(@Session() session) {
      const userId = session.userId;
      return this.userquestionService.findAllByUser(userId);
  }

  @Get('find/:id')
  findOne(@Param('id') id: number, @Session() session) {
      const userId = session.userId;
      return this.userquestionService.findOneByUser(id, userId);
  }

  @Get('count/totalquestions')
  async countTotalQuestions(@Session() session) {
      const userId = session.userId;
      const totalQuestions = await this.userquestionService.countTotalQuestionsByUser(userId);
      return `The total questions you created are: ${totalQuestions}`;
  }

  @Put('update/:id')
@UsePipes(ValidationPipe)
update(@Param('id') id: number, @Body() updateUserQuestionDto: UpdateUserQuestionDto, @Session() session) {
    const userId = session.userId;
    return this.userquestionService.update(id, updateUserQuestionDto, userId);
}

  // @Delete('delete/:id')
  // delete(@Param('id') id: number,@Session() session) {
  //   return this.userquestionService.delete(id);
  // }

  // @Get('count/totalquestions')
  // async countTotalFaqs(@Session() session) {
  //   const totalFaqs = await this.userquestionService.countTotalQuestions();
  //   return `The total  faqs are: ${totalFaqs}`;
  // }
}
