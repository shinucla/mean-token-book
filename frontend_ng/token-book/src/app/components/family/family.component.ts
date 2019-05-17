import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  children = [];

  constructor(private userService: UserService,
	      private auth: AuthService,
	      private router: Router) { }

  ngOnInit() {
    this.userService.getChildren().subscribe(data => {
      this.children = data['users'];
    });
  }

  navToRegisterChild() {
    this.router.navigate(['/registerChild']);
  }
}
