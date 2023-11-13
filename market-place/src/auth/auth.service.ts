import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthrDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';


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

    const user = this.userRepo.create(createAuthDto);
    return await this.userRepo.save(user);
  }


  async signin(logindto:LoginDto){
   const au = await this.userRepo.findOneBy({username:logindto.username});
   const result = await bcrypt.compare(logindto.password,au.password)
    if(result){
      return true;
    }
    else{
      return false;
    }
    }
  }
//  async findAll() {
//     return await this.userRepo.find();
//   }

//   async findOne(id: number) {
//     return await this.userRepo.findOne({where: {id:id}});
    
//   }
 

//  async update(id: number, updateUserDto: UpdateUserDto) {
//      await this.userRepo.update(id,updateUserDto);
//      return  `The information of this #${id} has been updated`
//     }

  // async delete(id: number) {
  //     await this.userRepo.delete(id);
  //     return`The user of ID: #${id} has been removed`;
  // }

  // async blockUser(id: number) {
  //   const user = await this.userRepo.findOne({where: {id:id}});
  
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   await this.userRepo.update(id, { status: 'blocked' });
  //   return `The user of ID: #${id} has been blocked`;
  // }

  // async countTotalUsers() {
  //   return await this.userRepo.count();
    
  // }

  // async countBlockedUsers() {
  //   return  await this.userRepo.count({ where: { status: 'blocked' } });
  // }

  // async countActiveUsers() {
  //   return await this.userRepo.count({ where: { status: 'active' } });
  // }

  // async findBlockedUsers() {
  //   return await this.userRepo.find({ where: { status: 'blocked' } });
  // }

  // async findActiveUsers() {
  //   return await this.userRepo.find({ where: { status: 'active' } });
  // }


  // async findByUsername(username: string): Promise<User | undefined> {
  //   return this.userRepo.findOne({ where: { username } });
  // }


