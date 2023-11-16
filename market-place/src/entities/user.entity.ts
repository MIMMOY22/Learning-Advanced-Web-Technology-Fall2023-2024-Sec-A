import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserQuestion } from "./userquestion.entity";
import { Download } from "./download.entity";


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

    @Column({name: 'type',nullable:false})
    type: string;

    @Column({ default: 'active' })
    status: string;

     
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }

   
    @OneToMany(() => UserQuestion, userQuestion => userQuestion.user)
    questions: UserQuestion[];

    @Column({ unique: true, nullable: false })
    identifier: string;

    @OneToMany(() => Download, download => download.user)
    downloads: Download[];

    @BeforeInsert()
     setIdentifier() {
   // Set the identifier to the same value as the username before inserting into the database
    this.identifier = this.username;
    }

}
