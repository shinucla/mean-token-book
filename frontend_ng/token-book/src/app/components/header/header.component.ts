import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

const RoleEnum = {
  PARENT: 1,
  CHILD: 2,
  ADMIN: 4
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  isParent: boolean = false;
  
  constructor(private auth: AuthService,
	      private http: HttpClient,
	      private router: Router
	     ) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
    this.isParent = (this.user && RoleEnum.PARENT === (RoleEnum.PARENT & this.user.role_id)
		     ? true
		     : false);
  }

  navToHome() {
    this.router.navigate(['/home']);
  }

  navToSettings() {
    this.router.navigate(['/settings']);
  }

  navToFeedback() {
    this.router.navigate(['/feedback']);
  }

  logout() {
    this.auth.logout();
    this.user = null;
    //this.router.navigate(['/login']);
    location.reload();
  }
}
