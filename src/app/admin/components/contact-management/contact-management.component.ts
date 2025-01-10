import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactManagementComponent {

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    linkedin: ['', Validators.required],
    github: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  saveContactInfo() {
    console.log(this.contactForm.value);
  }
}
