import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SeoService } from "@portfolio/shared/services/common/seo.service";

@Component({
  selector: 'portfolio-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class ContactManagementComponent implements OnInit {

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    linkedin: ['', Validators.required],
    github: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private seoService: SeoService) {}

  ngOnInit() {

    /*
     * On définit les données SEO de la page.
     */
    this.seoService.setSeoData('Gestion Contact - PortFolio',
      { 'description': 'Gérez les informations de contact du portfolio.' }
    );
  }

  saveContactInfo() {
    console.log(this.contactForm.value);
  }
}
