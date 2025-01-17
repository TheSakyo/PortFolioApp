import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AnimationService } from "@portfolio/shared/services/common/animation.service";
import { SeoService } from "@portfolio/shared/services/common/seo.service";

@Component({
  selector: 'portfolio-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, NgOptimizedImage ]
})
export class ProjectsComponent implements OnInit {

  /***********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /**********************************************************/

  /**
   * Constructeur du composant 'Mes Projets'.
   * @param elementRef - Référence à l'élément racine du composant.
   * @param animationService - Le service correspondant à la gestion des animations de l'application.
   * @param seoService - Le service correspondant à la gestion du SEO de l'application.
   */
  constructor(private elementRef: ElementRef, private animationService: AnimationService,
              private seoService: SeoService) {}

  /***********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /**********************************************************/

  /**
   * Lors de l'initialisation du composant, on initialise l'animation du scroll.
   */
  ngOnInit() {

    // Initialisation de l'animation du scroll à l'aide de son service
    this.animationService.initScroll(this.elementRef);

    /*
     * On définit les données SEO de la page.
     */
    this.seoService.setSeoData('Projets - PortFolio de Sacha',
      {
        'description': 'Explorez mes projets de développement et mes réalisations professionnelles.',
        'keywords': 'projets, développement, portfolio, réalisations, professionnels, sacha cardone'
      }
    );
  }
}

