import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';



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
}