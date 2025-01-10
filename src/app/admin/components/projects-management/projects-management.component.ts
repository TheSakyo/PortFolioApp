import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'sakyo-projects-management',
  templateUrl: './projects-management.component.html',
  styleUrls: ['./projects-management.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectsManagementComponent {
  projects: { title: string; description: string; tags: string[] }[] = [];
  isEditing = false;
  projectForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    tags: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  saveProject() {

    const projectValue = this.convertValues(this.projectForm.value);

    if(this.projectForm.invalid || this.projects.length <= 0 || !projectValue) return;

    if(this.isEditing) {

      const index = this.projects.findIndex(p => p.title === this.projectForm.value.title);
      this.projects[index] = projectValue;

    } else this.projects.push(projectValue);

    this.projectForm.reset();
    this.isEditing = false;
  }

  editProject(project: any) {

    this.isEditing = true;
    this.projectForm.setValue({
      ...project,
      tags: project.tags.join(', '),
    });
  }

  deleteProject(project: any) {
    this.projects = this.projects.filter(p => p !== project);
  }

  convertValues(values: Partial<{ title: string | null, description: string | null,  tags: string | null }>) : Project | null {

    if(!values.title || !values.description || !values.tags || values.tags.split(',').every(tag => tag.trim().length > 0)) return null;
    else return {
      title: values.title,
      description: values.description,
      tags: values.tags.split(',').map(tag => tag.trim()),
    }
  }
}

interface Project {
  title: string;
  description: string;
  tags: string[];
}
