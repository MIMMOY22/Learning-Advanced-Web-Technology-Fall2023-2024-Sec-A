import { IsString,IsNotEmpty } from "class-validator";


export class CreateUserQuestionDto {
    @IsString({message: 'Question must be string!'})
    @IsNotEmpty({message: 'Write down the question'})
    question:string;
}