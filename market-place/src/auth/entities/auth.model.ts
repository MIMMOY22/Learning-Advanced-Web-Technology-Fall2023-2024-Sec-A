

export class User{
    constructor(private Username: string,  Email: string,
                private PhoneNumber: string, private DOB: Date,
                private Gender: string,private Password: string,
                private ConfirmPassword:string,private Type: string,
                private Status:string){}
}