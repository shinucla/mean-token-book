import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
