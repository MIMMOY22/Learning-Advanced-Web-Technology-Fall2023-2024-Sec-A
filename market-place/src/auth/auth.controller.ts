import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, Session, UnauthorizedException, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthrDto } from './dto/signup.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard} from './auth.guard'
import { EditProfileDto } from './dto/editprofile.dto';

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
async signin(@Body() logindto: LoginDto, @Session() session) {
  const isAuthenticated = await this.authService.signin(logindto);

  if (isAuthenticated) {
    session.username = logindto.username; // Set the session username 
    return 'successfully logged in';
  } else {
    throw new HttpException('login failed', HttpStatus.UNAUTHORIZED);
  }
}


  @Get('signout')
  signout(@Session() session)
  {
    if (session.destroy()){
      return {message:'Logged out'}
    }
    else{
      throw new UnauthorizedException('invalid action!');
    }
  }

@Get('profile')
@UseGuards(AuthGuard)
async getProfile(@Session() session) {
  const user = await this.authService.getUserProfile(session.username);
  return { success: true, user };
}


@Put('profile/edit')
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
async editProfile(@Body() editProfileDto: EditProfileDto, @Session() session) {
  const updatedUser = await this.authService.editUserProfile(session.username, editProfileDto);
  return { success: true, user: updatedUser };
}
}