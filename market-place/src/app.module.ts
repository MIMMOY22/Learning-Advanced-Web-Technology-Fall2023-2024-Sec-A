import { Module,NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareMiddleware } from './middleware/middleware.middleware';
import { FaqModule } from './operations/faq.module';
import { UserquestionModule } from './operations/userquestion.module';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';
@Module({
  imports: [UserManagementModule,FaqModule,UserquestionModule,TypeOrmModule.forRoot(config), AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: 'user-management/create', method: RequestMethod.POST })
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: 'user-management/update/:id', method: RequestMethod.PUT })
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: 'faq/create', method: RequestMethod.POST })
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: 'faq/update/:id', method: RequestMethod.PUT })
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: 'userquestion/create', method: RequestMethod.POST })
      .apply(MiddlewareMiddleware)
      .forRoutes({ path: 'userquestion/update/:id', method: RequestMethod.PUT });
  }
}
