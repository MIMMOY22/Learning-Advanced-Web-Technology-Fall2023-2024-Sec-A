import { IsString, IsNotEmpty, Matches, MaxLength, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
    @IsString({message: 'Username must be string!'})
    @IsNotEmpty({message: 'Fill the Username'})
    username:string;
    @IsString()
    @MinLength(4,{message:'Minimum length 4'})
    @MaxLength(10,{message:'Maximum length 10'})
    @Matches(/[A-Za-z0-9@#$%&!]{8,10}/,{message:'invalid Password!'})
    password: string;

    @IsString()
    type: string;

}
