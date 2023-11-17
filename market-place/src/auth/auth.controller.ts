import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, Session, UnauthorizedException, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthrDto } from './dto/signup.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard} from './auth.guard'
import { EditProfileDto } from './dto/editprofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { TemplateService } from 'src/operations/template.service';
import { DownloadService } from 'src/operations/download.service';
  import { AuthUserGuard } from './authuser.guard';


@Controller('auth')
export class AuthController {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
             private readonly authService: AuthService,
             private readonly templateService: TemplateService, // Inject TemplateService
             private readonly downloadService: DownloadService,) {} // Inject DownloadService

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
 // const isAuthenticated = await this.authService.signin(logindto);
  const authenticationResult = await this.authService.signin(logindto,session);
  if (authenticationResult.includes('successful')) {
    session.username = logindto.username; // Set the session username 
    session.type = logindto.type;

     return   authenticationResult;
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


@Get('templates')
  @UseGuards(AuthUserGuard,AuthGuard)
  async getAllTemplates() {
    return this.templateService.getAllTemplates();
  }

  @Post('download/:templateId')
  @UseGuards(AuthUserGuard,AuthGuard)
  async downloadTemplate(@Session() session, @Param('templateId') templateId: number) {
    const userId = session.userId;
    return this.downloadService.downloadTemplate(userId, templateId);
  }

  @Get('download/history')
  @UseGuards(AuthUserGuard,AuthGuard)
  async getDownloadHistory(@Session() session) {
    const userId = session.userId;
    return this.downloadService.getDownloadHistory(userId);
  }
}