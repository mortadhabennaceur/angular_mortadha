import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from '../core/models/Residence';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
})
export class AddResidenceComponent implements OnInit {
  residenceForm!: FormGroup;
  isUpdateMode: boolean = false;
  listResidences: Residence[] = [];
  imagePreview: string | null = null; // Store preview of selected image
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.listResidences = navigation?.extras.state?.['residences'] || [];
  }

  ngOnInit(): void {
    this.residenceForm = this.fb.group({
      id: [0], // Champ caché
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: [null, Validators.required],
      status: ['Disponible', Validators.required], // Valeur par défaut
      apartments: this.fb.array([]) // Liste dynamique des appartements
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isUpdateMode = true;
        const id = +params['id'];
        const existingResidence = this.listResidences.find(res => res.id === id);
        if (existingResidence) {
          this.residenceForm.patchValue(existingResidence);
          this.imagePreview = existingResidence.image; // Load existing image preview
        }
      }
    });
  }

   // Handle image file selection
   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.residenceForm.patchValue({ image: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  // Getter pour les appartements
  get apartments() {
    return this.residenceForm.get('apartments') as FormArray;
  }

  // Ajouter un appartement
  addApartment() {
    const apartmentGroup = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      surface: ['', [Validators.required, Validators.min(20)]], // Exemple de validation : min 20 m²
      price: ['', [Validators.required, Validators.min(10000)]]
    });
    this.apartments.push(apartmentGroup);
  }

  // Supprimer un appartement
  removeApartment(index: number) {
    this.apartments.removeAt(index);
  }

  saveResidence(): void {
    if (this.residenceForm.invalid) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const formData = this.residenceForm.value;

    if (this.isUpdateMode) {
      const index = this.listResidences.findIndex(res => res.id === formData.id);
      if (index !== -1) {
        this.listResidences[index] = { ...formData };
        alert('Résidence mise à jour avec succès !');
      }
    } else {
      formData.id = this.listResidences.length + 1;
      this.listResidences.push(formData);
      alert('Résidence ajoutée avec succès !');
    }

    this.router.navigate(['/residences'], { state: { residences: this.listResidences } });
  }
}
