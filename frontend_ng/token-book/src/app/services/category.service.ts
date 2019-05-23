import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private server: ServerService) { }

  getCategories() {
    return this.server.resolve('/api/category/getCategories', {});
  }

  createCategory(json) {
    return this.server.resolve('/api/category/createCategory', json);
  }
}
