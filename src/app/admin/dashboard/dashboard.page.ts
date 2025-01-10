import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {NavigationService} from "../../shared/services/navigation.service";
import {ISectionInterface} from "../../shared/interfaces/global/section.interface";
import {AboutComponent} from "../../main/components/about/about.component";
import {ContactComponent} from "../../main/components/contact/contact.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {ProjectsComponent} from "../../main/components/projects/projects.component";
import {AboutManagementComponent} from "../components/about-management/about-management.component";
import {ProjectsManagementComponent} from "../components/projects-management/projects-management.component";
import {ContactManagementComponent} from "../components/contact-management/contact-management.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HeaderComponent,
    AboutManagementComponent,
    ProjectsManagementComponent,
    ContactManagementComponent
  ]
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
  public get sectionsMenu(): ISectionInterface[] { return this.navigationService.sections; }
}
