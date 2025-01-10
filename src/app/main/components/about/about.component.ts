import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DarkLightToggleComponent } from '../../../shared/components/elements/dark-light-toggle/dark-light-toggle.component';
import { AnimationService } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'sakyo-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    DarkLightToggleComponent
  ]
})
export class AboutComponent implements OnInit {

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du composant 'À Propos de moi'.
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

