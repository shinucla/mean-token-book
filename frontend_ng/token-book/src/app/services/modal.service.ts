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

@Component({
  selector: 'app-dialog-container',
  template: `
    <template #dialogContainer></template>
  `,
})
export class DialogContainerComponent implements OnInit, OnDestroy {
  @Input() data = { title: 'TEST' };

  constructor(private resolver: ComponentFactoryResolver) {}

  /*
   * ViewContainerRef is a reference to a Container
   * ViewContainerRef stores a reference to the template element
   * and exposes an API to create components
   */
  @ViewChild("dialogContainer", { read: ViewContainerRef }) container; // this.container
  componentRef: ComponentRef<any>;

  ngOnInit() {
    console.log('container init.');
    this.createComponent()
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  createComponent() {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DialogComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = this.data;
  }
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
       contentComponent: Component,
       onOk: () => void,
       onCancel: () => void) {
    const compFactory = this.componentFactoryResolver.resolveComponentFactory(DialogContainerComponent);
    const compRef = compFactory.create(this.injector);
    compRef.instance.data = { title: 'Test' };

    this.appRef.attachView(compRef.hostView);

    const domElem = (compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = compRef;


    //this.ngbModal.open(DialogComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModal.open(DialogContainerComponent, { size: 'lg', backdrop: 'static' });
  }
}
