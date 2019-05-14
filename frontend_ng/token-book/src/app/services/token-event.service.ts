import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class TokenEventService {

  constructor(private server: ServerService) { }

  getChildrenTokenEvents() {
    return this.server.resolve('/api/token-event/getChildrenTokenEvents', {});
  }

}
