# Image Gallery - Angular + PrimeNG

Galería de imágenes interactiva construida con Angular y PrimeNG.

## Características

- Visualización en grid responsive (Tailwind CSS)
- Imagen destacada (primera posición)
- Eliminación individual con confirmación (p-toast)
- Selección múltiple con p-checkbox
- Reordenamiento drag-and-drop (Angular CDK)
- Eliminación en bloque con feedback visual
- Tests unitarios y de integración

## Tecnologías

- Angular 20+ (Standalone Components)
- PrimeNG 20.3.0 (p-checkbox, p-button, p-toast)
- Tailwind CSS
- Angular CDK (Drag & Drop)
- TypeScript
- Jasmine/Karma

## Estructura del Proyecto

```bash
src/
 └─ app/
     ├─ components/
     │   ├─ image/
     │   │   ├─ image.ts
     │   │   └─ image.html
     │   └─ gallery/
     │       ├─ gallery.ts
     │       └─ gallery.html
     ├─ data/
     │   └─ images.data.ts
     └─ models/
         └─ imageModel.ts
```

## Clonar el proyecto

```bash
git clone https://github.com/BrianStiv/Image-gallery-angular.git
```

## Cómo ejecutar

```bash
npm install
ng serve
```

## Testing

```bash
ng test
ng test --code-coverage
```

## Build

```bash
ng build
```

