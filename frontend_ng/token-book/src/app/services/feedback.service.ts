import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private server: ServerService) { }

  getFeedbacks() {
    return this.server.resolve('/api/feedback/getFeedbacks', {});
  }

  getFeedbacksForAdmin() {
    return this.server.resolve('/api/feedback/getFeedbacksForAdmin', {});
  }

  create(json) {
    return this.server.resolve('/api/feedback/create', json);
  }

  delete(id) {
    return this.server.resolve('/api/feedback/delete', { id: id });
  }
}
