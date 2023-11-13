import { IsString,IsEmail,IsPhoneNumber,IsISO8601,MinLength,MaxLength,
          Matches,IsNotEmpty,IsOptional,Equals} from "class-validator";
import{Transform} from "class-transformer";


export class CreateUserDto {

    @IsString({message: 'Username must be string!'})
    @IsNotEmpty({message: 'Fill the Username'})
    username:string;
   

    @IsEmail()
    @IsNotEmpty({message: 'Fill the Email'})
    @Matches((/^([a-z]{3,8})([0-9]{1,4})@((gmail|yahoo|hotmail)).com$/),
    {message: 'pattern not match..add 3 to 8 small character then 1 to 4 digit before @'})
    email: string;

    @IsPhoneNumber("BD")
    @IsNotEmpty({message: 'Fill the Phone Number'})
    @Matches((/([01]|\+88)?\d{11}/),{message: 'invaid Phone Number!'})
    phonenumber: string;

    @IsISO8601({},{message: 'Invalid Date of Birth!'})
    @IsNotEmpty({message: 'Fill the Date of Birth'})
    dob: Date;

    @IsString()
    @IsNotEmpty({message: 'Fill the Gender'})
    gender: string;

    @IsString()
    @MinLength(4,{message:'Minimum length 4'})
    @MaxLength(10,{message:'Maximum length 10'})
   // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
   @Matches(/[A-Za-z0-9@#$%&!]{8,10}/,{message:'invalid Password!'})
   password: string;

    @IsString()
    @MinLength(4,{message:'Minimum length 4'})
    @MaxLength(10,{message:'Maximum length 10'})
   // @Matches(/[A-Za-z0-9@#$%&!]{8,10}/, { message: 'Passwords do not match', context: { passwordField: 'password' } })
  // @Transform(({ value }) => value.toLowerCase()) 
   //@Equals('password', { message: 'Passwords do not match' })
   // @Matches('password')
    confirmpassword: string;

    @IsString()
    @IsNotEmpty({message: 'Fill the Type'})
    type: string;

    @IsString()
    @IsOptional()
    status: string;


}
