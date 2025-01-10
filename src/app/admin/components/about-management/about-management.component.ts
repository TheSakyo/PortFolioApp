import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-about-management',
  templateUrl: './about-management.component.html',
  styleUrls: ['./about-management.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AboutManagementComponent {

  aboutForm = this.fb.group({
    greeting: ['', Validators.required],
    name: ['', Validators.required],
    title: ['', Validators.required],
    bio: ['', Validators.required],
  });

  skills: string[] = [];
  skillForm = this.fb.group({
    skill: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  saveIntroduction() {
    console.log(this.aboutForm.value);
  }

  addSkill() {

    if(this.skillForm.invalid) return

    let skill = this.skillForm.value.skill;
    if(!skill || this.skills.includes(skill)) return;

    this.skills.push(skill);
    this.skillForm.reset();
  }

  deleteSkill(skill: string) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  editSkill(skill: string) {
    this.skillForm.setValue({ skill });
  }
}
