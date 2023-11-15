import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes,ValidationPipe, UseGuards, Req, Session} from '@nestjs/common';
import { UserquestionService } from './userquestion.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';
import { AuthUserGuard } from 'src/auth/authuser.guard';

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
  findAll() {
    return this.userquestionService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: number) {
    return this.userquestionService.findOne(id);
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() updateUserQuestionDto: CreateUserQuestionDto) {
    return this.userquestionService.update(id, updateUserQuestionDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.userquestionService.delete(id);
  }

  @Get('count/totalquestions')
  async countTotalFaqs() {
    const totalFaqs = await this.userquestionService.countTotalQuestions();
    return `The total  faqs are: ${totalFaqs}`;
  }
}
