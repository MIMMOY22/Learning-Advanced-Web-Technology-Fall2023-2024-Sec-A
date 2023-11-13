import { IsString,IsNotEmpty } from "class-validator";


export class UpdateUserQuestionDto {
    @IsString({message: 'Question must be string!'})
    @IsNotEmpty({message: 'Write down the question'})
    question:string;
}