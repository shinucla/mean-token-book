import {
  Directive,
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

/*
 * The anchor directive
 * https://angular.io/guide/dynamic-component-loader#the-anchor-directive
 * Before you can add components you have to define an anchor point to tell Angular where to insert components.
 */
@Directive({
  selector: '[app-insertion]',
})
class InsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

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
      <button type="button" class="btn btn-outline-dark" *ngIf="!!data.onOk" (click)="onOk()">OK</button>
      <button type="button" class="btn btn-outline-dark" *ngIf="!!data.onCancel" (click)="onCancel()">Cancel</button>
    </div>
  `
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>

  constructor(private activeModal: NgbActiveModal,
	      private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.data.component) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOk() {
    this.data.onOk();
    this.activeModal.close('Close');
  }

  onCancel() {
    this.data.onCancel();
    this.activeModal.close('Close');
  }
}

// ================================================================

@Injectable({
  providedIn: 'root',
})
export class ModalService {
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
				       component: content,
				       onOk: onOk,
				       onCancel: onCancel
				     };
  }
}
