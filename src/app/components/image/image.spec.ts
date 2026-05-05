import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageModel } from '../../models/imageModel';
import { ImageComponent } from './image';

describe('ImageComponent - Tests Básicos', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  const testImage: ImageModel = {
    id: 1,
    url: 'https://example.com/image.jpg',
    description: 'Test Image'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('image', testImage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image with correct src and alt', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(testImage.url);
    expect(img.getAttribute('alt')).toBe(testImage.description);
  });

  it('should emit deleteImage event when delete button is clicked', () => {
    let emittedImage: ImageModel | undefined;
    component.deleteImage.subscribe(img => emittedImage = img);

    const button = fixture.nativeElement.querySelector('button[aria-label="Eliminar Imagen"]');
    button.click();

    expect(emittedImage).toEqual(testImage);
  });

  it('should emit selectImage event when container is clicked', () => {
    let emittedImage: ImageModel | undefined;
    component.selectImage.subscribe(img => emittedImage = img);

    const container = fixture.nativeElement.querySelector('[role="button"]');
    container.click();

    expect(emittedImage).toEqual(testImage);
  });

  it('should apply selected class when isSelected is true', () => {
    fixture.componentRef.setInput('isSelected', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.relative');
    expect(container.classList.contains('selected')).toBeTrue();
  });
});
