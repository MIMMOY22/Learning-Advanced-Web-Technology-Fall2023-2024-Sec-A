import { Injectable, ConflictException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FaqService {

  constructor(@InjectRepository(Faq) private readonly faqRepo: Repository<Faq>){}

   async create(createFaqDto: CreateFaqDto) {
    
      const existingQuestion = await this.faqRepo.findOne({
          where: [
            { question: createFaqDto.question },
            { answer: createFaqDto.answer },
            
          ],
        });
    
        if (existingQuestion) {
          throw new ConflictException('Question already created');
        }
    
    const faq = await this.faqRepo.create(createFaqDto);
    return await this.faqRepo.save(faq);
  }

  async findAll() {
    return await this.faqRepo.find();
  }

  async findOne(id: number) {
    return await this.faqRepo.findOne({where: {id:id}});
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    await this.faqRepo.update(id,updateFaqDto);
    return `This FAQ of id #${id} has been updated`;
  }

  async delete(id: number) {
    await this.faqRepo.delete(id);
    return `This FAQ of id #${id} has been deleted`;
  }

  async countTotalFaqs() {
    return await this.faqRepo.count();
    
  }
}
