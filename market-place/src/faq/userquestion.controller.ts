import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes,ValidationPipe} from '@nestjs/common';

import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { UserquestionService } from './userquestion.service';
import { CreateUserQuestionDto } from './dto/create-user-question.dto';

@Controller('userquestion')
export class UserquestionController {
  constructor(private readonly userquestionService: UserquestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createUserQuestionDto: CreateUserQuestionDto) {
    return this.userquestionService.create( createUserQuestionDto);
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
