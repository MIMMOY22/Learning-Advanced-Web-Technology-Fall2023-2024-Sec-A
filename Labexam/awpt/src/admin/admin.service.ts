import { Injectable, Param } from '@nestjs/common';
import { Employee } from './entities/employee.model';
import { RegisterEmployeeDto } from './dto/registerEmployee.dto';

@Injectable()
export class AdminService {
    employees: Employee[]=[];

    create(registerEmployeeDto:RegisterEmployeeDto){
        const newEmployee=new Employee(registerEmployeeDto.eId,registerEmployeeDto.eName,registerEmployeeDto.contNo,registerEmployeeDto.uName,registerEmployeeDto.ePass)
        this.employees.push(newEmployee);
        return "New employee registered..";
    }

    employeelist(){
        return [...this.employees];
    }
    find(id:number)
    {
         return[this.employees[id-1]];
    }


}

