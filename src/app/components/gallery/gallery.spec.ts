import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GalleryComponent } from './gallery';
import { ImageModel } from '../../models/imageModel';
import { MessageService } from 'primeng/api';

describe('GalleryComponent - Tests Básicos', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  const createMockImages = (count: number): ImageModel[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      url: `https://example.com/image${i + 1}.jpg`,
      description: `Imagen ${i + 1}`
    }));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    // Reset the global signal state for each test
    component.images.set(createMockImages(12));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of images', () => {
    const mockImages = createMockImages(5);
    component.images.set(mockImages);
    fixture.detectChanges();

    const imageComponents = fixture.nativeElement.querySelectorAll('app-image');
    expect(imageComponents.length).toBe(5);
  });

  it('should toggle selection of an image', () => {
    const image = component.images()[1];
    expect(component.isImageSelected(image.id)).toBeFalse();

    component.toggleSelection(image);
    fixture.detectChanges();
    expect(component.isImageSelected(image.id)).toBeTrue();

    component.toggleSelection(image);
    fixture.detectChanges();
    expect(component.isImageSelected(image.id)).toBeFalse();
  });

  it('should delete an image when confirmDeleteAccept is called', () => {
    const mockImages: ImageModel[] = createMockImages(2);
    component.images.set(mockImages);
    component.confirmDeleteImage = mockImages[1];

    component.confirmDeleteAccept();
    fixture.detectChanges();

    const imagesAfterDelete = component.images();
    expect(imagesAfterDelete.length).toBe(1);
    expect(imagesAfterDelete[0].id).toBe(1);
  });

  it('should reorder images on drag-and-drop', () => {
    const mockImages: ImageModel[] = [
      { id: 1, url: 'https://example.com/1.jpg', description: 'Imagen 1' },
      { id: 2, url: 'https://example.com/2.jpg', description: 'Imagen 2' },
      { id: 3, url: 'https://example.com/3.jpg', description: 'Imagen 3' },
    ];
    component.images.set(mockImages);

    const MockDrop = { previousIndex: 0, currentIndex: 2 };
    component.drop(MockDrop as any);

    const reorderedImages = component.images();
    expect(reorderedImages[2].id).toBe(1);
    expect(reorderedImages[0].id).toBe(2);
  });
});
