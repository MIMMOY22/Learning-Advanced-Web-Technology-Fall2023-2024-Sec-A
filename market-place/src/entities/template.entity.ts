
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
