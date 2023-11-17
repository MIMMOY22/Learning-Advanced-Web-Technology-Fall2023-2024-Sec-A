import { Injectable, NotFoundException,ConflictException,Session, Param } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthrDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { EditProfileDto } from './dto/editprofile.dto';




@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async create(createAuthDto: CreateAuthrDto) {
    const existingUser = await this.userRepo.findOne({
      where: [
        { username: createAuthDto.username },
        { email: createAuthDto.email },
        { phonenumber: createAuthDto.phonenumber },
      ],
    });

    if (existingUser) {
      throw new ConflictException('Username, email, or phone number is already taken');
    }

    // const user = this.userRepo.create(createAuthDto);
    const user = this.userRepo.create({
      ...createAuthDto,
      identifier: createAuthDto.username, // Use username as the identifier, adjust as needed
    });
    return await this.userRepo.save(user);
  }


  async signin(logindto:LoginDto,session: Record<string, any>){
   const au = await this.userRepo.findOneBy({username: logindto.username,type: logindto.type});
  
      if (!au) {
    return 'User not found';  
  }
  const result = await bcrypt.compare(logindto.password, au.password);
  if (result)
{
    session.userId = au.id;
    session.username = logindto.username;
    session.type = logindto.type;
    //console.log(session);
    if (au.type === 'admin') {
      return 'Admin login successful';
    }
     else if (au.type === 'user') {
      return 'User login successful';
  }

  return 'Login failed'; 
}
}


async getUserProfile(username: string) {
  return await this.userRepo.findOne({ where:{username:username} }); // or use your own logic to retrieve the user profile
}

async editUserProfile(username: string, editProfileDto: EditProfileDto) {
  const user = await this.userRepo.findOne({ where: { username } });
  

  if (!user) {
    throw new NotFoundException('User not found');
  }

  // Update user properties based on editProfileDto
  if (editProfileDto.password) {
    user.password = await bcrypt.hash(editProfileDto.password, 10);
  }

  // Update other properties from editProfileDto
  user.username = editProfileDto.username;
  user.email = editProfileDto.email;
  user.phonenumber = editProfileDto.phonenumber;
  user.dob = editProfileDto.dob;
  user.gender = editProfileDto.gender;

  return await this.userRepo.save(user);
}
// async getUserById(id: number) {
//   return await this.userRepo.findOne({where: {id:id},
//                                        relations:{questions:true}});
// }

  }