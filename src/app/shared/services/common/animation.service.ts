import { ElementRef, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimationService {

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/

  /**
   * Initialise les animations de scroll pour les éléments spécifiques.
   * @param elementRef Référence à l'élément racine du composant.
   */
  public initScroll(elementRef: ElementRef) {
  
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
    const timelineItems = elementRef.nativeElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: Element) => observer.observe(item));
  
    // Sélectionne tous les éléments ayant la classe 'skill' dans le DOM et les observe.
    const skillItems = elementRef.nativeElement.querySelectorAll('.skill');
    skillItems.forEach((item: Element) => observer.observe(item));
  
    // Sélectionne tous les éléments ayant la classe 'fade-in' dans le DOM et les observe.
    const fadeElements = elementRef.nativeElement.querySelectorAll('.fade-in');
    fadeElements.forEach((item: Element) => observer.observe(item));
  }
}
