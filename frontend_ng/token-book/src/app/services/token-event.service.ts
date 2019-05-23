import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenEventService {

  constructor(private server: ServerService) { }

  getChildrenTokenEvents(): Observable<any[]> {
    return this.server.resolve('/api/token-event/getChildrenTokenEvents', {});
  }

  createTokenEvent(json): Observable<any[]> {
    return this.server.resolve('/api/token-event/create', json);
  }

}
