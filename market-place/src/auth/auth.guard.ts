import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userIdentifier = request.session.identifier; // Assuming identifier is stored in the session
  
    // Check if request and request.session are defined, and the identifiers match
    return request && request.session && request.session.username
                   && request.session.identifier === userIdentifier;

  }
}