import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  
  constructor(private auth: AuthService,
	      private http: HttpClient,
	      private router: Router
	     ) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
  }

  logout() {
    this.auth.logout();
    this.user = this.auth.getUserValue();
    //this.router.navigate(['/login']);
    location.reload();
  }
}
