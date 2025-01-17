import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { AboutManagementComponent } from "@portfolio/admin/components/about-management/about-management.component";
import { ContactManagementComponent } from "@portfolio/admin/components/contact-management/contact-management.component";
import { ProjectsManagementComponent } from "@portfolio/admin/components/projects-management/projects-management.component";
import { HeaderComponent } from "@portfolio/shared/components/header/header.component";
import { ISection } from "@portfolio/shared/interfaces/section.interface";
import { NavigationService } from "@portfolio/shared/services/common/navigation.service";

@Component({
  selector: 'portfolio-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [ IonicModule, CommonModule, HeaderComponent, AboutManagementComponent,
            ProjectsManagementComponent, ContactManagementComponent]
})
export class DashboardPage implements OnInit {

  /**********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /***********************************************************/

  /**
   * Constructeur de la page qui contient le tableau de bord de l'application.
   * @param navigationService - Le service de navigation pour gérer la navigation.
   */
  constructor(private navigationService: NavigationService) {

    this.navigationService.adminMode = true; // Activation du mode administrateur
    this.navigationService.currentSection = 'about-management'; // Initialisation de la section actuelle
  }

  /**
   * Lors de l'initialisation de la page, on initialise les sections de navigation
   * pour le menu administrateur.
   */
  ngOnInit() {

    /*
     * Initialisation des sections de navigation pour le menu administrateur.
     */
    this.navigationService.sections = [
      { name: 'Gestion Générale', icon: 'information-circle-outline', route: 'about-management' }, // Section 'Gestion Générale'
      { name: 'Gestion des Projets', icon: 'briefcase-outline', route: 'projects-management' }, // Section 'Gestion des Projets'
      { name: 'Gestion des informations de contact', icon: 'mail-outline', route: 'contact-management' }, // Section 'Gestion des informations de contact'
    ];
  }

  /*****************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /******************************************************/

  /**
   * Renvoie Les boutons du menu correspondant aux différentes sections pouvant être affiché à l'administrateur.
   * @returns Les informations des boutons de navigation.
   */
  public get sectionsMenu(): ISection[] { return this.navigationService.sections; }
}
