import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'sakyo-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class Error404Component {

  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/

  public cloudCount: number[] = [1, 2, 3, 4, 5]; // Tableau contenant des nombres pour générer des nuages aléatoirement

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du composant pour afficher l'erreur 404.
   * @param navigationService Le service de navigation.
   */
  constructor(private navigationService: NavigationService, private themeService: ThemeService) {

    this.themeService.initializeTheme(); // Récupère l'état du mode à l'aide de son service correspondant
  }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/

  /**
   * Navigue vers la page d'accueil en utilisant le service de navigation.
   */
  public goHome() { this.navigationService.goHome(); }
}
