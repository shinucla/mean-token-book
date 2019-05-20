import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  showDialog(form) {
    this.modalService.show("Hello", null, null, null);
  }
}
