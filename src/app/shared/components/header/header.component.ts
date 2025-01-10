import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '../../services/navigation.service';
import { DarkLightToggleComponent } from '../elements/dark-light-toggle/dark-light-toggle.component';
import { ISectionInterface } from "../../interfaces/global/section.interface";

@Component({
  selector: 'sakyo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    DarkLightToggleComponent
  ]
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
  public sections: ISectionInterface[] = [];

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
