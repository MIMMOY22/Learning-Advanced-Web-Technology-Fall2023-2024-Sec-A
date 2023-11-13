import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, Session, UnauthorizedException, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthrDto } from './dto/signup.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard} from './auth.guard'

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  create(@Body() createAuthDto: CreateAuthrDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('index')
  @UseGuards(AuthGuard)
  getIndex(@Session() session){
    console.log(session.username);
    return 'Successfull';
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async signin(@Body() logindto: LoginDto,@Session() session)
  {
    const res = (await this.authService.signin(logindto));
    if(await this.authService.signin(logindto)){
      session.email = logindto.username;
      return 'successfully logged in';
    }
    else{
      throw new HttpException('login failed',HttpStatus.UNAUTHORIZED);
    }
  }


  //@Get('signout')

  // @Get('findall')
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get('find/:id')
  // findOne(@Param('id') id: number) {
  //   return this.userManagementService.findOne(id);
  // }

  // @Put('update/:id')
  // @UsePipes(ValidationPipe)
  // update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userManagementService.update(id, updateUserDto);
  // }

  // @Delete('delete/:id')
  // delete(@Param('id') id: number) {
  //   return this.userManagementService.delete(id);
  // }

  // @Post('block/:id')
  // blockUser(@Param('id') id: number) {
  //   return this.userManagementService.blockUser(id);
  // }

  // @Get('count/totalusers')
  // async countTotalUsers() {
  //   const totalUsers = await this.userManagementService.countTotalUsers();
  //   return `The total  users are: ${totalUsers}`;
  // }

  // @Get('count/blockedusers')
  // async countBlockedUsers() {
  //   const blockedUsers = await this.userManagementService.countBlockedUsers();
  //   return ` Number of blocked users are: ${blockedUsers}`;
  // }

  // @Get('count/activeusers')
  // async countActiveUsers() {
  //   const activeUsers = await this.userManagementService.countActiveUsers();
  //   return ` Active users are: ${activeUsers}`;
  // }

  // @Get('blockeduserinfo')
  // async findBlockedUsers() {
  //   const blockedUsers = await this.userManagementService.findBlockedUsers();
  //   return blockedUsers;
  // }

  // @Get('activeuserinfo')
  // async findActiveUsers() {
  //   const activeUsers = await this.userManagementService.findActiveUsers();
  //   return activeUsers;
  // }
}

