import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '../../../services/navigation.service';
import { DarkLightToggleComponent } from '../../elements/dark-light-toggle/dark-light-toggle.component';

@Component({
  selector: 'app-header',
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

  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/

  /**
   * Représente les boutons du menu correspondant aux 
   * différentes section pouvant être affiché à l'utilisateur
   */ 
  private _sections: { name: string, icon: string, value: string }[] = [
    { name: 'À Propos', icon: 'information-circle-outline', value: 'about' },
    { name: 'Projets', icon: 'briefcase-outline', value: 'projects' },
    { name: 'Contact', icon: 'mail-outline', value: 'contact' },
  ];

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/
  
  /**
   * Constructeur du composant de l'en-tête.
   * @param navigationService - Le service de navigation pour gérer la navigation.
   * @param themeService - Le service correspondant à la gestion des thèmes sur l'application.
   */
  constructor(private navigationService: NavigationService) {}

  /***************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /***************************************************/
  
  /** 
   * Renvoie La section qui est affiché à l'aide du service de navigation. 
   * @returns La section actuellement affiché.
   */
  public get currentSection(): string { return this.navigationService.currentSection; }
  
  /** 
   * Renvoie Les boutons du menu correspondant aux différentes section pouvant être affiché à l'utilisateur. 
   * @returns Les informations des boutons de navigation.
   */
  public get sections(): { name: string, icon: string, value: string }[] { return this._sections; }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/
  
  /**
   * Change l'affichage du contenu correspondant a la section demandé à l'aide du service de navigation.
   * @param section La section a affiché.
   */
  public changeSection(section: string) { this.navigationService.changeSection(section); }
}
