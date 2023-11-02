import { IsString,IsNumber,IsEmail } from "class-validator";

export class RegisterEmployeeDto{
     @IsNumber()
     eId:string;
     @IsString()
     eName:string;
     @IsString()
     contNo:string;
     @IsString()
     uName:string;
     @IsString()
     ePass:string;
}