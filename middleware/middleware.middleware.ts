import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class MiddlewareMiddleware implements NestMiddleware {
  //use(req: any, res: any, next: () => void)
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware for create and update routes...');
    next();
  }

}
