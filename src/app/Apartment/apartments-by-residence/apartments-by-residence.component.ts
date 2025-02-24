import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
})
export class ApartmentsByResidenceComponent implements OnInit {
  residenceId!: number;
  apartments = [
    { apartNum: 100, floorNum: 1, surface: 50, terrace: true, surfaceTerrace: 10, category: 'A', residenceId: 1 },
    { apartNum: 200, floorNum: 2, surface: 60, terrace: false, surfaceTerrace: 0, category: 'B', residenceId: 1 },
    { apartNum: 300, floorNum: 3, surface: 70, terrace: true, surfaceTerrace: 15, category: 'C', residenceId: 2 }
  ];
  filteredApartments: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.residenceId = +this.route.snapshot.paramMap.get('id')!;
    this.filteredApartments = this.apartments.filter(apartment => apartment.residenceId === this.residenceId);
  }
}
