import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/
  
  private _currentSectionSubject = new BehaviorSubject<string>('about'); // Section par défaut
  private _currentSection$ = this._currentSectionSubject.asObservable(); // Section actuelle en tant qu'Observable

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du service de navigation.
   * @param router - Le service de routage pour naviguer entre les pages.
   */
  constructor(private router: Router) {} 

  /***************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /***************************************************/

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

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/
  
  /** 
   * Change la section actuelle.
   * @param section - La nouvelle section à afficher.
   */
  public changeSection(section: string) { this._currentSectionSubject.next(section); }

  /** 
   * Navigue vers la page d'accueil.
   */
  public goHome() { this.router.navigate(['/']); }
}
