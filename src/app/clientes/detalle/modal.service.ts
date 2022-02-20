import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal: boolean = false;
  private notificarUpload = new EventEmitter<any>();

  constructor() { }

  public getNotificarUpload(): EventEmitter<any> {
    return this.notificarUpload;
  }

  public mostrarModal() {
    return this.modal;
  }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }
}
