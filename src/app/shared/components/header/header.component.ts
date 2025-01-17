import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DarkLightToggleComponent } from "@portfolio/shared/components/elements/dark-light-toggle/dark-light-toggle.component";
import { ISection } from "@portfolio/shared/interfaces/section.interface";
import { NavigationService } from "@portfolio/shared/services/common/navigation.service";

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, DarkLightToggleComponent ]
})
export class HeaderComponent {

  /********************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /*********************************************************/

  /**
   * Représente le titre de la page à l'utilisateur
   */
  @Input()
  public title: string = 'Portfolio';

  /**
   * Représente les boutons du menu correspondant aux
   * différentes sections pouvant être affichées à l'utilisateur.
   */
  @Input()
  public sections: ISection[] = [];

  /**
   * Représente l'activation du bouton de retour à la page d'accueil.
   */
  @Input()
  public returnButton: boolean = false;

  /**********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /***********************************************************/

  /**
   * Constructeur du composant de l'en-tête.
   * @param navigationService - Le service de navigation pour gérer la navigation.
   */
  constructor(private navigationService: NavigationService) {}

  /*****************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /******************************************************/

  /**
   * Renvoie la section actuellement affichée à l'aide du service de navigation.
   * @returns La section présentement affichée.
   */
  public get currentSection(): string { return this.navigationService.currentSection; }

  /******************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /*******************************************************/

  /**
   * Change l'affichage du contenu correspondant à la section demandée à l'aide du service de navigation.
   * @param section La section à afficher.
   */
  public changeSection(section: string) { this.navigationService.currentSection = section; }

  /**
   * Retourne à la page d'accueil.
   */
  public returnHome() { this.navigationService.goHome(); }
}
