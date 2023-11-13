import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserQuestion } from "./userquestion.entity";


@Entity("users")
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable:false})
    username: string;

    @Column({unique: true, nullable:false})
    email: string;

    @Column({ nullable:false})
    phonenumber: string;

    @Column({nullable:false})
    dob: Date;

    @Column({nullable:false})
    gender: string;

    @Column({nullable:false})
    password: string;

    @Column({nullable:false})
    confirmpassword: string;

    @Column({ nullable:false})
    type: string;

    @Column({ default: 'active' })
    status: string;

     
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }

    @OneToMany(() => UserQuestion, userQuestion => userQuestion.user)
    userQuestions: UserQuestion[];
}

export interface UserWithoutPassword {
    id: number;
    username: string;
    email: string;
    phonenumber: string;
    dob: Date;
    gender: string;
    type: string;
    status: string;
    userQuestions: UserQuestion[];
  }