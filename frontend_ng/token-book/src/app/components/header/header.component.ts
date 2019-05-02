import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = {};
  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    console.log('calling api');
    this.authService.login({ username: 'kevinzx', password: 'matrix' });
    this.user = localStorage.getItem("user");
    this.user = { firstName: 'Kevin', lastName: 'Zhuang' };
    console.log(localStorage.getItem('jwt'));
    //this.http
    //  .post<any>('/api/user/login', { username: 'kevinzx', password: 'matrix' })
    //  .subscribe(x => {
    //	console.log(x);
    //  });
    
  }

}
