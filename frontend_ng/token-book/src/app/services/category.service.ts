import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private server: ServerService) { }

  create(json) {
    return this.server.resolve('/api/category/create', json);
  }

  update(json) {
    return this.server.resolve('/api/category/update', json);
  }

  delete(json) {
    return this.server.resolve('/api/category/delete', json);
  }

  getCategories() {
    return this.server.resolve('/api/category/getCategories', {});
  }
}
