import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("faqs")
export class Faq{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false})
    question: string;

    @Column({ nullable:false})
    answer: string;
}