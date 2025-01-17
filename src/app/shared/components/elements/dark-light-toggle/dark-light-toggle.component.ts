import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from "@portfolio/shared/services/common/theme.service";

@Component({
  selector: 'portfolio-dark-light-toggle',
  templateUrl: './dark-light-toggle.component.html',
  styleUrls: ['./dark-light-toggle.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule ]
})
export class DarkLightToggleComponent {

  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/

  private _isDarkMode: boolean; // Propriété pour vérifier l'état du mode sombre

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du composant du bouton pour appliquer le thème sombre ou clair.
   * @param themeService - Le service correspondant à la gestion des thèmes sur l'application.
   */
  constructor(private themeService: ThemeService) {
    this._isDarkMode = this.themeService.isDarkMode; // Récupère l'état du mode sombre à l'aide de son service correspondant
  }

  /***************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /***************************************************/

  /**
   * Vérifie si l'application est en mode sombre à l'aide de la variable '_isDarkMode'.
   * @returns Une valeur booléenne.
   */
  public get isDarkMode(): boolean { return this._isDarkMode; }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/

  /**
   * Change le thème de l'application web à l'aide de son service correspondant.
   */
  public toggleTheme() {
    this.themeService.toggleTheme(); // Appelle la méthode pour basculer le thème
    this._isDarkMode = this.themeService.isDarkMode; // Met à jour l'état du mode sombre
  }
}
