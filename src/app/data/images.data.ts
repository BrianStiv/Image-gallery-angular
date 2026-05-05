import { signal } from '@angular/core';
import { ImageModel } from '../models/imageModel';

export const images = signal<ImageModel[]>([
  { id: 1, url: 'https://picsum.photos/id/237/400/600', description: 'Imagen 1' },
  { id: 2, url: 'https://picsum.photos/id/238/400/600', description: 'Imagen 2' },
  { id: 3, url: 'https://picsum.photos/id/239/400/600', description: 'Imagen 3' },
  { id: 4, url: 'https://picsum.photos/id/240/400/600', description: 'Imagen 4' },
  { id: 5, url: 'https://picsum.photos/id/241/400/600', description: 'Imagen 5' },
  { id: 6, url: 'https://picsum.photos/id/242/400/600', description: 'Imagen 6' },
  { id: 7, url: 'https://picsum.photos/id/243/400/600', description: 'Imagen 7' },
  { id: 8, url: 'https://picsum.photos/id/244/400/600', description: 'Imagen 8' },
  { id: 9, url: 'https://picsum.photos/id/10/400/600', description: 'Imagen 9' },
  { id: 10, url: 'https://picsum.photos/id/11/400/600', description: 'Imagen 10' },
  { id: 11, url: 'https://picsum.photos/id/12/400/600', description: 'Imagen 11' },
  { id: 12, url: 'https://picsum.photos/id/13/400/600', description: 'Imagen 12' },
]);
