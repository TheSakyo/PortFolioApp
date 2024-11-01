import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/sections/header/header.component';
import { AboutComponent } from '../components/sections/about/about.component';
import { ProjectsComponent } from '../components/sections/projects/projects.component';
import { ContactComponent } from '../components/sections/contact/contact.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    HeaderComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent
  ]
})
export class ContentPage {

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/
  
  constructor() {}
}
