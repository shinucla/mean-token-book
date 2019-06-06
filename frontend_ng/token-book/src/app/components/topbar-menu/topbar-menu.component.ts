import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const RoleEnum = {
  PARENT: 1,
  CHILD: 2,
};

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.scss']
})
export class TopbarMenuComponent implements OnInit {
  user: any;
  RoleEnum = RoleEnum;

  constructor(private router: Router,
	      private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
  }

  navToHome() {
    this.router.navigate(['/home']);
  }

  navToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navToFamily() {
    this.router.navigate(['/family']);
  }

  navToCategories() {
    this.router.navigate(['/categories']);
  }

}
