import {
  Injectable,
  Input,
  OnInit,
  OnDestroy,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


// ================================================================

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ data.title }}</h4>
      <a class="close" href (click)="onCancel(); false">
        <i class="far fa-times-circle"></i>
      </a>
    </div>
    <div class="modal-body">
      <ng-template #container></ng-template>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" *ngIf="!!_onOk" (click)="onOk()">OK</button>
      <button type="button" class="btn btn-outline-dark" (click)="onCancel()">Cancel</button>
    </div>
  `
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>; // must implements IConfirm interface
  _onOk: () => void;
  _onCancel: () => void;

  constructor(private activeModal: NgbActiveModal,
	      private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.data.component) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(componentFactory);
    this._onOk = this.componentRef.instance.onOk;
    this._onCancel = this.componentRef.instance.onCancel;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOk() {
    this._onOk();
    this.activeModal.close('Close');
  }

  onCancel() {
    if (this._onCancel) {
      this._onCancel();
    }
    this.activeModal.close('Close');
  }
}

// ================================================================

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
	      private ngbModal: NgbModal) { }

  show(title: string, content: Component) {
    let compRef = this.ngbModal.open(DialogComponent, { size: 'lg', backdrop: 'static' });
    compRef.componentInstance.data = { title: title, component: content};
  }
}
