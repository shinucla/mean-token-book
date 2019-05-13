import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ChildrenComponent } from './children/children.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';

enum SettingType {
  CHILDREN,
  CATEGORY,
  PROFILE,
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  setting: SettingType;
  SettingType = SettingType;
  
  constructor() { }

  ngOnInit() {
    this.setting = SettingType.CHILDREN;
  }

  loadChildrenSettings() {
    this.setting = SettingType.CHILDREN;
  }

  loadCategorySettings() {
    this.setting = SettingType.CATEGORY;
  }

  loadProfileSettings() {
    this.setting = SettingType.PROFILE;
  }
}
