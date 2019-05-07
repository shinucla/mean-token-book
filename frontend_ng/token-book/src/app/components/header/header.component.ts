import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  
  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
  }

}
