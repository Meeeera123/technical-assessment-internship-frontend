import { Component } from '@angular/core';
import { CatFormComponent } from './cat-form/cat-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatFormComponent],
  template: `<cat-form></cat-form>`
})
export class App {}
