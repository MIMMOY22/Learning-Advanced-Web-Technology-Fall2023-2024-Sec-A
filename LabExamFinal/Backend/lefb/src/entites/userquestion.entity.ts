import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("userquestions")
export class UserQuestion{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false})
    question: string;

    @ManyToOne(() => User, user => user.questions)
    @JoinColumn({ name: "user_id" })
    user: User;
}