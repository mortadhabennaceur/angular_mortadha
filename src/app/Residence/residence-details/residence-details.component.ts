import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from '../../core/models/Residence';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residence: Residence | undefined;
  nextResidenceId: number | null = null;

  listResidences: Residence[] = [
    { id: 1, name: "El fel", address: "Borj Cedria", image: "../../assets/images/R1.jpg", status: "Disponible" },
    { id: 2, name: "El yasmine", address: "Ezzahra", image: "../../assets/images/R2.jpg", status: "Disponible" },
    { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/R3.jpg", status: "Vendu" },
    { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/R4.jpg", status: "En Construction" }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!; // Get the new ID from the URL
      this.residence = this.listResidences.find(res => res.id === id); // Find the residence
      this.nextResidenceId = this.getNextResidenceId(id); // Calculate the next residence ID
    });
  }

  getNextResidenceId(currentId: number): number | null {
    const index = this.listResidences.findIndex(res => res.id === currentId);
    return index < this.listResidences.length - 1 ? this.listResidences[index + 1].id : null;
  }
}