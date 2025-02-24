import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from '../../core/models/Residence';
import { CommonService } from '../../core/models/Services/commonService';
import { ResidenceService } from '../../core/models/Services/ResidenceService';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit{
  listResidences:Residence[]=[];

    constructor(private router: Router,private commonService: CommonService,private residenceService: ResidenceService) {
      const navigation = this.router.getCurrentNavigation();
      const updatedResidences = navigation?.extras.state?.['residences'];
      if (updatedResidences) {
        this.listResidences = updatedResidences;
      }
    }

    ngOnInit(): void {
      this.residenceService.getResidences().subscribe((data) => {
        this.listResidences = data;
      });
    }

    deleteResidence(id: number): void {
      this.residenceService.deleteResidence(id).subscribe(() => {
        this.listResidences = this.listResidences.filter(res => res.id !== id);
      });
    }
  
    goToAddResidence(): void {
      this.router.navigate(['/add-residence'], { state: { residences: this.listResidences } });
    }
  
    goToUpdateResidence(residenceId: number): void {
      this.router.navigate([`/add-residence`, residenceId]);
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

  getSimilarAddresses(address: string): number {
    return this.commonService.getSameValueOf(this.listResidences, 'address', address);
  }
    

}
