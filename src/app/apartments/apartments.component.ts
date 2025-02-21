import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../core/models/Services/commonService';


@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
})
export class ApartmentsComponent {
  apartments = [
    { apartNum: 100, floorNum: 1, surface: 50, terrace: true, surfaceTerrace: 10, category: 'A', residenceId: 1 },
    { apartNum: 200, floorNum: 2, surface: 60, terrace: false, surfaceTerrace: 0, category: 'B', residenceId: 1 },
    { apartNum: 300, floorNum: 3, surface: 60, terrace: true, surfaceTerrace: 15, category: 'C', residenceId: 2 }
  ];

  constructor(private router: Router,private commonService: CommonService) {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if (navigationState?.['apartments']) {
      this.apartments = navigationState['apartments'];
    }
  }

  goToAddApartment(): void {
    this.router.navigate(['/add-apartment'], { state: { apartments: this.apartments } });
  }

  getSameSurface(surface: number): number {
    return this.commonService.getSameValueOf(this.apartments, 'surface', surface);
  }
}
