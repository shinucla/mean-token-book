import {
  Injectable,
  Injector,
  Input,
  OnInit,
  OnDestroy,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  ApplicationRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../components/header/header.component';

// ================================================================

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ data.title }}</h4>
      <a class="close" href (click)="activeModal.dismiss('Cross click'); false">
        <i class="far fa-times-circle"></i>
      </a>
    </div>
    <div class="modal-body">
      <p>Hello, World!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class DialogComponent {
  @Input() data: any = { title: 'Hello' };
  constructor(public activeModal: NgbActiveModal) {}
}

// ================================================================

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  dialogComponentRef: ComponentRef<DialogContainerComponent>

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
	      private appRef: ApplicationRef,
	      private injector: Injector,
	      private ngbModal: NgbModal) { }

  show(title: string,
       content: Component,
       onOk: () => void,
       onCancel: () => void) {
    let compRef = this.ngbModal.open(DialogComponent, { size: 'lg', backdrop: 'static' });
    compRef.componentInstance.data = { title: title,
				       comp: content,
				       onOk: onOk,
				       onCancel: onCancel
				     };
  }
}
