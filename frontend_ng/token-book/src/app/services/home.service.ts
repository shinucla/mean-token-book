import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private server: ServerService) { }

  getRandomPhotos(config) {
    return this.server.resolve('/api/home/getRandomPhotos', config);
  }
}
