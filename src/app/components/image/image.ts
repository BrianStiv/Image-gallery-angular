import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageModel } from '../../models/imageModel';
import { CheckboxModule } from 'primeng/checkbox';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, Button],
  templateUrl: './image.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block relative w-full h-full'
  }
})
export class ImageComponent {

  image = input.required<ImageModel>();
  isSelected = input<boolean>(false);
  isFeatured = input<boolean>(false);

  deleteImage = output<ImageModel>();
  selectImage = output<ImageModel>();


  toggleSelection(event: Event) {
    event.stopPropagation();
    this.selectImage.emit(this.image());
  }

  deleteImageClick(event: Event) {
    event.stopPropagation();
    this.deleteImage.emit(this.image());
  }

  onCheckboxChange() {
    this.selectImage.emit(this.image());
  }
}
