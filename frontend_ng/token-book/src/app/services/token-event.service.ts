import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenEventService {

  constructor(private server: ServerService) { }

  create(json): Observable<any[]> {
    return this.server.resolve('/api/token-event/create', json);
  }

  update(json): Observable<any[]> {
    return this.server.resolve('/api/token-event/update', json);
  }

  delete(id): Observable<any[]> {
    return this.server.resolve('/api/token-event/delete', { id: id });
  }

  getChildrenTokenEvents(): Observable<any[]> {
    return this.server.resolve('/api/token-event/getChildrenTokenEvents', {});
  }

  getChildrenTokenCounts(): Observable<any[]> {
    return this.server.resolve('/api/token-event/getChildrenTokenCounts', {});
  }
}
