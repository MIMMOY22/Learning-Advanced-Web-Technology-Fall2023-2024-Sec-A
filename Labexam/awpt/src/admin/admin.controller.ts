import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Body, Get, Param, Post } from '@nestjs/common';
import { RegisterEmployeeDto } from './dto/registerEmployee.dto';

@Controller('admin')
export class AdminController {
    constructor (private readonly AdminService:AdminService){}


    @Post('create')
    registerUser(@Body() registerEmployeeDto:RegisterEmployeeDto){
                
                    return  this.AdminService.create(registerEmployeeDto)};

    @Get('all')
    getAllEmployee(){
        return this.AdminService.employeelist();
    }

    @Get('get/:id')
    getEmployee(@Param('id')id:number){
        return this.AdminService.find(id);
    }

}

