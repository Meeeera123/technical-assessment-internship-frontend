import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatForm } from './cat-form';

describe('CatForm', () => {
  let component: CatForm;
  let fixture: ComponentFixture<CatForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
