import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe,SetMetadata, UseGuards,Session
  } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthAdminGuard } from 'src/auth/authadmin.guard';



@Controller('user-management')
@UseGuards(AuthAdminGuard)

export class UserManagementController {

  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('create')
  @UsePipes(ValidationPipe)

  create(@Body() createUserDto: CreateUserDto,@Session() session) {
    return this.userManagementService.create(createUserDto);
  }

  @Get('findall')
  
  findAll() {
    return this.userManagementService.findAll();
  }

  @Get('find/:id')
  
  findOne(@Param('id') id: number) {
    return this.userManagementService.findOne(id);
  }

  @Put('update/:id')
 
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userManagementService.update(id, updateUserDto);
  }

  @Delete('delete/:id')

  delete(@Param('id') id: number) {
    return this.userManagementService.delete(id);
  }

  @Post('block/:id')

  blockUser(@Param('id') id: number) {
    return this.userManagementService.blockUser(id);
  }

  @Get('count/totalusers')

  async countTotalUsers() {
    const totalUsers = await this.userManagementService.countTotalUsers();
    return `The total  users are: ${totalUsers}`;
  }

  @Get('count/blockedusers')

  async countBlockedUsers() {
    const blockedUsers = await this.userManagementService.countBlockedUsers();
    return ` Number of blocked users are: ${blockedUsers}`;
  }

  @Get('count/activeusers')

  async countActiveUsers() {
    const activeUsers = await this.userManagementService.countActiveUsers();
    return ` Active users are: ${activeUsers}`;
  }

  @Get('blockeduserinfo')

  async findBlockedUsers() {
    const blockedUsers = await this.userManagementService.findBlockedUsers();
    return blockedUsers;
  }

  @Get('activeuserinfo')

  async findActiveUsers() {
    const activeUsers = await this.userManagementService.findActiveUsers();
    return activeUsers;
  }
}

