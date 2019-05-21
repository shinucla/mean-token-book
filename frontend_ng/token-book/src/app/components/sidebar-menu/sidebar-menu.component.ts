import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const RoleEnum = {
  PARENT: 1,
  CHILD: 2,
};

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
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
  
  navToFamily() {
    this.router.navigate(['/family']);
  }

  navToCategories() {
    this.router.navigate(['/categories']);
  }

}
