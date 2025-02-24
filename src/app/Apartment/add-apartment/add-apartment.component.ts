import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
})
export class AddApartmentComponent {
  apartForm = new FormGroup({
    apartNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    floorNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    surface: new FormControl('', Validators.required),
    terrace: new FormControl(false),
    surfaceTerrace: new FormControl({ value: '', disabled: true }),
    category: new FormControl('S+1', Validators.required), 
    residenceId: new FormControl('', Validators.required),
  });

  apartments: any[] = [];

  constructor(public router: Router) {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    this.apartments = navigationState?.['apartments'] || [];
    
    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        this.apartForm.get('surfaceTerrace')?.enable();
      } else {
        this.apartForm.get('surfaceTerrace')?.disable();
        this.apartForm.get('surfaceTerrace')?.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.apartForm.valid) {
      const newApartment = this.apartForm.value;
      this.apartments.push(newApartment);
      alert('Apartment added successfully!');
      
      this.router.navigate(['/apartments'], { state: { apartments: this.apartments } });
    }
  }
}
