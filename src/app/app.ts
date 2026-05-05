import { Component } from '@angular/core';
import { GalleryComponent } from './components/gallery/gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GalleryComponent],
  template: '<app-gallery></app-gallery>',
  styles: []
})
export class AppComponent {}
