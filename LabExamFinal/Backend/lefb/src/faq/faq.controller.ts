import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes,ValidationPipe, UseGuards} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';


@Controller('faq')

export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get('showall')
  findAll() {
    return this.faqService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: number) {
    return this.faqService.findOne(id);
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.faqService.delete(id);
  }

  @Get('count/totalfaqs')
  async countTotalFaqs() {
    const totalFaqs = await this.faqService.countTotalFaqs();
    return `The total  faqs are: ${totalFaqs}`;
  }
}
