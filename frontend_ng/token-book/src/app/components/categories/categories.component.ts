import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[];

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  showDialog() {
    //this.modalService.show("Hello", null, null, null);
  }
}
