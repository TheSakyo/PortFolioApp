import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {ISectionInterface} from "../interfaces/global/section.interface";

@Injectable({ providedIn: 'root' })
export class NavigationService {

  /*********************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /********************************************************/

  private _sections: ISectionInterface[] = []; // Sections du menu de navigation
  private _currentSectionSubject = new BehaviorSubject<string>('about'); // Section par défaut
  private _currentSection$ = this._currentSectionSubject.asObservable(); // Section actuelle en tant qu'Observable
  private isInAdmin = false; // Indique si l'utilisateur est dans l'interface d'administration

  /***********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /**********************************************************/

  /**
   * Constructeur du service de navigation.
   * @param router - Le service de routage pour naviguer entre les pages.
   */
  constructor(private router: Router) {}

  /******************************************************/
  /**************   ⬇️    SETTERS    ⬇️   **************/
  /*****************************************************/

  /**
   * Définit si l'utilisateur est dans l'interface d'administration.
   * @param isInAdmin - Indique si l'utilisateur est dans l'interface d'administration.
   */
  public set adminMode(isInAdmin: boolean) { this.isInAdmin = isInAdmin; }

  /**
   * Définit les sections du menu de navigation.
   * @param sections - Les sections du menu de navigation.
   */
  public set sections(sections: ISectionInterface[]) { this._sections = sections; }

  /**
   * Définit la section actuelle.
   * @param section - La nouvelle section à afficher.
   */
  public set currentSection(section: string) { this._currentSectionSubject.next(section); }

  /******************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /*****************************************************/

  /**
   * Renvoie si l'utilisateur est dans l'interface d'administration.
   * @returns Indique si l'utilisateur est dans l'interface d'administration.
   */
  public get adminMode(): boolean { return this.isInAdmin; }

  /**
   * Renvoie les sections du menu de navigation.
   * @returns Les sections du menu de navigation.
   */
  public get sections(): ISectionInterface[] { return this._sections; }

  /**
   * Renvoie la valeur actuelle de la section.
   * @returns La section actuelle.
   */
  public get currentSection(): string { return this._currentSectionSubject.value; }

  /**
   * Expose l'observable de la section actuelle pour les abonnements si nécessaire.
   * @returns La section actuelle en tant qu'Observable.
   */
  public get currentSectionObservable() { return this._currentSection$; }

  /*******************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /******************************************************/

  /**
   * Navigue vers la page d'accueil (renvoie à la section 'about').
   */
  public goHome() {

    this.currentSection = 'about'; // Définit la section actuelle à 'about'
    this.router.navigate(['/']).then(); // Navigue vers la page d'accueil
  }
}
