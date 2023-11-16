// download.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Download } from 'src/entities/download.entity';

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(Download)
    private readonly downloadRepo: Repository<Download>,
  ) {}

  async downloadTemplate(userId: number, templateId: number): Promise<Download> {
    const download = this.downloadRepo.create({ user: { id: userId }, template: { id: templateId } });
    return await this.downloadRepo.save(download);
  }

  async getDownloadHistory(userId: number): Promise<Download[]> {
    return await this.downloadRepo.find({ where: { user: { id: userId } },
                                         relations: ['template'], });
  }

  // Add more methods as needed
}
