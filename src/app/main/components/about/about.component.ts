import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AnimationService } from 'src/app/shared/services/animation.service';
import { SeoService } from "../../../shared/services/seo.service";

@Component({
  selector: 'sakyo-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
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
   * @param seoService - Le service correspondant à la gestion du SEO de l'application.
   */
  constructor(private elementRef: ElementRef, private animationService: AnimationService,
              private seoService: SeoService) {}

  /********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /********************************************************/

  /**
   * Lors de l'initialisation du composant, on initialise l'animation du scroll.
   */
  ngOnInit() {

    // Initialisation de l'animation du scroll à l'aide de son service
    this.animationService.initScroll(this.elementRef);

    /*
     * On définit les données SEO de la page.
     */
    this.seoService.setSeoData('À Propos - PortFolio de Sacha',
        {
            'description': 'Découvrez mon parcours, mes compétences et mes expériences professionnelles.',
            'keywords': 'sacha cardone, parcours, compétences, expériences, professionnelles, portfolio'
        }
    );
  }
}

