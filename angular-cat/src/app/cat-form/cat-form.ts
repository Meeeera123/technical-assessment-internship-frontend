import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'cat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="container mt-5">
      <div class="card shadow-sm mx-auto" style="max-width: 400px;">
        <div class="card-body">
          <h3 class="card-title mb-4">Cat Info Checker</h3>
          <form [formGroup]="catForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="catName" class="form-label">Cat's Name:</label>
              <input id="catName" class="form-control" formControlName="catName" [readonly]="showFact"/>
              <div *ngIf="catForm.get('catName')?.invalid && catForm.get('catName')?.touched" class="text-danger small mt-1">
                Cat's name is required
              </div>
            </div>
            <div class="mb-3">
              <label for="catAge" class="form-label">Cat's Age:</label>
              <input id="catAge" type="number" class="form-control" formControlName="catAge" [readonly]="showFact"/>
              <div *ngIf="catForm.get('catAge')?.invalid && catForm.get('catAge')?.touched" class="text-danger small mt-1">
                Age must be a positive number
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100" [disabled]="catForm.invalid">
              {{ showFact ? 'Show Cat Fact' : 'Show Cat Info' }}
            </button>
          </form>
          <div *ngIf="resultMessage" class="alert alert-info mt-4">{{ resultMessage }}</div>
          <div *ngIf="catFact" class="alert alert-success mt-2">🐾 {{ catFact }}</div>
        </div>
      </div>
    </div>
  `
})
export class CatFormComponent {
  resultMessage = '';
  catFact = '';
  catForm;
  showFact = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.catForm = this.fb.group({
      catName: ['', Validators.required],
      catAge: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (!this.showFact) {
      // First submission: show cat info and fetch cat fact immediately
      const { catName, catAge } = this.catForm.value;
      const ageNum = Number(catAge || 0);
  
      this.resultMessage = `${catName} is ${ageNum} years old${ageNum >= 10 ? " (That's a senior cat!)" : ''}.`;
      this.catFact = '';
      this.showFact = true;
  
      // Fetch cat fact immediately after showing cat info
      this.http.get<any>('https://catfact.ninja/fact').subscribe({
        next: data => this.catFact = data.fact,
        error: () => this.catFact = 'Failed to get cat fact!'
      });
    } else {
      // Next times: fetch a new cat fact
      this.http.get<any>('https://catfact.ninja/fact').subscribe({
        next: data => this.catFact = data.fact,
        error: () => this.catFact = 'Failed to get cat fact!'
      });
    }
  }
  
}
