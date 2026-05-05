import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModel } from '../../models/imageModel';
import { images } from '../../data/images.data';
import { ImageComponent } from '../image/image';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Button } from "primeng/button";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ImageComponent, CdkDrag, CdkDropList, ToastModule, Button],
  providers: [MessageService],
  templateUrl: './gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  confirmDeleteImage: ImageModel | null = null;
  images = images;
  selectedIds = signal<Set<number>>(new Set());

  constructor(private messageService: MessageService) {}

  onAccept() {
    if (this.confirmDeleteImage) {
      this.confirmDeleteAccept();
    } else {
      this.confirmDeleteMultipleAccept();
    }
  }

  onReject() {
    if (this.confirmDeleteImage) {
      this.confirmDeleteReject();
    } else {
      this.confirmDeleteMultipleReject();
    }
  }

  handleDelete(image: ImageModel){
    this.confirmDeleteImage = image;
    this.messageService.add({
      key: 'confirm',
      severity: 'warn',
      summary: 'Confirmar eliminación',
      detail: '¿Estás seguro de que deseas eliminar esta imagen?',
      sticky: true,
      closable: false
    });
  }

  confirmDeleteAccept() {
    const image = this.confirmDeleteImage;
    if (!image) return;

    this.selectedIds.update(ids => {
      const newIds = new Set(ids);
      newIds.delete(image.id);
      return newIds;
    });

    this.images.update(imagesOfArray => imagesOfArray.filter(i => i !== image));
    this.confirmDeleteImage = null;
    this.messageService.clear('confirm');
    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Imagen eliminada correctamente' });
  }

  confirmDeleteReject() {
    this.confirmDeleteImage = null;
    this.messageService.clear('confirm');
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación cancelada' });
  }

  drop(event: CdkDragDrop<ImageModel[]>){
    this.images.update(images => {
      moveItemInArray(images, event.previousIndex, event.currentIndex);
      return images;
    });
  }

  isImageSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  toggleSelection(image: ImageModel) {
    this.selectedIds.update(ids => {
      const newIds = new Set(ids);
      if(newIds.has(image.id)) {
        newIds.delete(image.id);
      } else {
        newIds.add(image.id);
      }
      return newIds;
    });
  }

  deleteSelected() {
    const selectedCount = this.selectedIds().size;
    if(selectedCount === 0) return;

    this.messageService.add({
      key: 'confirm',
      severity: 'warn',
      summary: 'Confirmar eliminación',
      detail: `¿Eliminar ${selectedCount} ${selectedCount === 1 ? 'imagen' : 'imágenes'} ${selectedCount === 1 ? 'seleccionada' : 'seleccionadas'}?`,
      sticky: true,
      closable: false
    });
  }

  confirmDeleteMultipleAccept() {
    this.images.update(images => images.filter(img => !this.selectedIds().has(img.id)));
    const count = this.selectedIds().size;
    this.selectedIds.set(new Set());
    this.messageService.clear('confirm');
    this.messageService.add({ severity: 'success', summary: 'Eliminadas', detail: `${count} ${count === 1 ? 'imagen' : 'imágenes'} ${count === 1 ? 'eliminada' : 'eliminadas'} correctamente` });
  }

  confirmDeleteMultipleReject() {
    this.messageService.clear('confirm');
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación cancelada' });
  }
}
