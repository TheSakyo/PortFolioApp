import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule
  ]
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
