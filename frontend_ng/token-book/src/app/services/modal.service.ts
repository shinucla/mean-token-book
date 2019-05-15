import {
  Injectable,
  Injector,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ApplicationRef
} from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
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
  constructor(public activeModal: NgbActiveModal) {}
}


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  dialogComponentRef: ComponentRef<DialogComponent>

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
	      private appRef: ApplicationRef,
	      private injector: Injector,
	      private ngbModal: NgbModal) { }

  show(title: string,
       contentComponent: Component,
       onOk: () => void,
       onCancel: () => void) {
    //const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeaderComponent);
    //const componentRef = componentFactory.create(this.injector);

    this.ngbModal.open(DialogComponent, { size: 'lg', backdrop: 'static' });

    this.delay(10000);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
}
