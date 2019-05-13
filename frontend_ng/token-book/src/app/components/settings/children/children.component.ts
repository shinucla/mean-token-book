import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-settings-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {
  children = [];
  
  constructor(private userService: UserService,
	      private auth: AuthService) { }

  ngOnInit() {
    this.userService.getChildren().subscribe(data => {
      this.children = data['users'];
    });
  }

}
