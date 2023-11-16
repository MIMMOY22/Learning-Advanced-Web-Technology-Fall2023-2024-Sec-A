import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Download } from './download.entity';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Download, download => download.template)
  downloads: Download[];
}
