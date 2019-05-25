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
    <h3 class="modal-title">{{ data.title }}</h3>
    <a class="close" href (click)="onCancel(); false">
      <i class="far fa-times-circle"></i>
    </a>
  </div>
  <div class="modal-body">
    <ng-template #container></ng-template>
  </div>
  <div class="modal-body text-right">
    <button type="button" class="btn btn-outline-dark"
            *ngIf="componentRef && componentRef.instance.onOk"
            (click)="onOk()">OK</button>
    <button type="button" class="btn btn-outline-dark" (click)="onCancel()">Cancel</button>
  </div>
`
})
export class ContainerComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>; // must implements IConfirm interface

  constructor(private activeModal: NgbActiveModal,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.data.component) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(componentFactory);
    this.componentRef.instance.close = () => this.activeModal.close('close');
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOk() {
    this.componentRef.instance.onOk();
    //this.activeModal.close('Close');
  }

  onCancel() {
    if (this.componentRef && this.componentRef.instance.onCancel) {
      this.componentRef.instance.onCancel();
    }
    //this.activeModal.close('Close');
  }
}

// ================================================================

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private ngbModal: NgbModal) { }

  open(config) {
    // TBI
  }

  popup(config) {
    //TBI
  }

  editor(config) {
    //let compRef = this.ngbModal.open(DialogComponent, (config.style || { size: 'md', backdrop: 'static' }));
    //compRef.componentInstance.data = { title: config.title, component: content};
  }

  warn(config) {
    // TBI
  }

  confirm(config) {
    // TBI
  }

  info(config) {
    // TBI
  }

  message(config) {
    // TBI
  }
}




/*
 * Future modal service should go for following style:
 *
 * addImageAds: function(scope, records) {
 *   return (RipDialog.editor({ title: i18n('Add Image Ads'),
 *                              windowStyleName: 'rip-dialog-editor-xlarge',
 *                              directive: 'ripLocationEditorImageAdsEditor',
 *                              bindings: { records: [],
 *                                          canAddRemoveImageFiles: true }
 *                                        })
 *                    .result(function(ads) {
 *                       recordForSave(_.union(records, ads), scope.location);
 *                       return scope.updateLocation(scope.location);
 *                     }));
 * },
 *
*/
