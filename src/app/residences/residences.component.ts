import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from '../core/models/Residence';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent {
  listResidences:Residence[]=[
    {id:1,"name": "El fel","address":"Borj Cedria",
    "image":"../../assets/images/R1.jpg", status: "Disponible"},
    {id:2,"name": "El yasmine",
    "address":"Ezzahra","image":"../../assets/images/R2.jpg", status:
    "Disponible" },
    {id:3,"name": "El Arij",
    "address":"Rades","image":"../../assets/images/R3.jpg", status:
    "Vendu"},
    {id:4,"name": "El Anber","address":"inconnu",
    "image":"../../assets/images/R4.jpg", status: "En Construction"}
    ];

    constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      const updatedResidences = navigation?.extras.state?.['residences'];
      if (updatedResidences) {
        this.listResidences = updatedResidences;
      }
    }
  
    goToAddResidence(): void {
      this.router.navigate(['/add-residence'], { state: { residences: this.listResidences } });
    }
  
    goToUpdateResidence(residenceId: number): void {
      this.router.navigate([`/add-residence`, residenceId], { state: { residences: this.listResidences } });
    }
    
    goToApartmentsList(residenceId: number): void {
      this.router.navigate([`/apartments-by-residence/${residenceId}`]);
    }

    afficheradresse(address : string) : void {
          if (address == 'inconnu') {
            alert("adresse est inconnu");
          } else {
            alert(`addresse de cette résidence est : ${address}`);
          }
    }

    ajouteraufavoris(residence : Residence) {
      alert(`la résidence ${residence.name} a été ajouter au favoris`);
    }

    filteredResidences = [...this.listResidences]; // Initialize with all data

  filterAddress(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredResidences = this.listResidences.filter(listResidences =>
      listResidences.address.toLowerCase().includes(inputValue)
    );
  }
    

}
