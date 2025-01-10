import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AnimationService } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NgOptimizedImage
  ]
})
export class ProjectsComponent implements OnInit {

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du composant 'Mes Projets'.
   * @param elementRef - Référence à l'élément racine du composant.
   * @param animationService - Le service correspondant à la gestion des animations de l'application.
   */
  constructor(private elementRef: ElementRef, private animationService: AnimationService) {}

  /********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /********************************************************/

  /**
   * Lors de l'initialisation du composant, on initialise l'animation du scroll.
   */
  ngOnInit() {
    this.animationService.initScroll(this.elementRef); // Initialisation de l'animation du scroll à l'aide de son service
  }
}

