import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AboutComponent } from "@portfolio/main/components/about/about.component";
import { ContactComponent } from "@portfolio/main/components/contact/contact.component";
import { ProjectsComponent } from "@portfolio/main/components/projects/projects.component";
import { HeaderComponent } from "@portfolio/shared/components/header/header.component";
import { ISection } from "@portfolio/shared/interfaces/section.interface";
import { NavigationService } from "@portfolio/shared/services/common/navigation.service";

@Component({
  selector: 'portfolio-content',
  templateUrl: './content.page.html',
  standalone: true,
  imports: [ IonicModule, CommonModule, HeaderComponent, AboutComponent, ProjectsComponent, ContactComponent ]
})
export class ContentPage implements OnInit {

  /**********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /***********************************************************/

  /**
   * Constructeur de la page qui contient le contenu de l'application.
   * @param navigationService - Le service de navigation pour gérer la navigation.
   */
  constructor(private navigationService: NavigationService) {}

  /**
   * Lors de l'initialisation de la page, on initialise les sections de navigation
   * pour le menu de l'application.
   */
  ngOnInit() {

    /*
     * Initialisation des sections de navigation pour le menu de l'application.
     */
    this.navigationService.sections = [
      { name: 'À Propos', icon: 'information-circle-outline', route: 'about' }, // Section 'À Propos'
      { name: 'Projets', icon: 'briefcase-outline', route: 'projects' }, // Section 'Projets'
      { name: 'Contact', icon: 'mail-outline', route: 'contact' }, // Section 'Contact'
    ];
  }

  /*****************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /******************************************************/

  /**
   * Renvoie Les boutons du menu correspondant aux différentes sections pouvant être affiché à l'utilisateur.
   * @returns Les informations des boutons de navigation.
   */
  public get sectionsMenu(): ISection[] { return this.navigationService.sections; }
}
