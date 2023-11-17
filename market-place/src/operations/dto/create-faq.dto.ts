import { IsString,IsNotEmpty } from "class-validator";


export class CreateFaqDto {
    @IsString({message: 'Question must be string!'})
    @IsNotEmpty({message: 'Write down the question'})
    question:string;

    @IsString({message: 'Answer must be string!'})
    @IsNotEmpty({message: 'Write down the Answer'})
    answer:string;
}