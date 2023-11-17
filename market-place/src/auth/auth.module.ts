import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Template } from "src/entities/template.entity";
import { Download } from "src/entities/download.entity";
import { DownloadService } from "src/operations/download.service";
import { TemplateService } from "src/operations/template.service";

@Module({
  imports:[TypeOrmModule.forFeature([User, Template, Download])],
  controllers:[AuthController],
  providers:[AuthService, TemplateService, DownloadService],
  exports:[AuthService],
  
})
export class AuthModule{}