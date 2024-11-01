import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DarkLightToggleComponent } from '../../elements/dark-light-toggle/dark-light-toggle.component';

@Component({
  selector: 'app-about',
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
   * @param elementRef Référence à l'élément racine du composant.
   */
  constructor(private elementRef: ElementRef) {}

  /********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /********************************************************/
  
  /**
   * Lors de l'initialisation du composant, on initialise l'animation du scroll.
   */
  ngOnInit() {
    this.initScrollAnimations(); // Initialisation de l'animation du scroll
  }

  /***********************************************************/
  /**************   ⬇️    MÉTHODES PRIVÉES   ⬇️   **************/
  /***********************************************************/
  
  /**
   * Initialise les animations de scroll pour les éléments spécifiques.
   * Les éléments concernés sont les éléments de timeline, les compétences et les éléments avec une animation fade-in.
   */
  private initScrollAnimations() {
  
    // Crée un nouvel observateur d'intersection qui surveillera les éléments lors de leur intersection avec le viewport (zone visible de la page).
    const observer = new IntersectionObserver((entries) => {
      
      // Pour chaque entrée surveillée, on exécute le callback.
      entries.forEach(entry => {

        // Vérifie si l'élément est visible dans le viewport, si l'élément est visible, ajoute la classe 'visible' à l'élément.
        if(entry.isIntersecting) entry.target.classList.add('visible'); 
      });

    // Définit le seuil d'intersection à 0.1, ce qui signifie que 10% de l'élément doit être visible pour déclencher l'animation.  
    }, { threshold: 0.1 });
  
    // Sélectionne tous les éléments ayant la classe 'timeline-item' dans le DOM et les observe.
    const timelineItems = this.elementRef.nativeElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: Element) => observer.observe(item));
  
    // Sélectionne tous les éléments ayant la classe 'skill' dans le DOM et les observe.
    const skillItems = this.elementRef.nativeElement.querySelectorAll('.skill');
    skillItems.forEach((item: Element) => observer.observe(item));
  
    // Sélectionne tous les éléments ayant la classe 'fade-in' dans le DOM et les observe.
    const fadeElements = this.elementRef.nativeElement.querySelectorAll('.fade-in');
    fadeElements.forEach((item: Element) => observer.observe(item));
  }
}

