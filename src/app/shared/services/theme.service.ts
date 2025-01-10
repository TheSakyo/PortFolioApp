import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  
  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/
  
  private _isDarkMode: boolean; // Variable pour vérifier si le mode sombre est activé

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du service de la gestion des thèmes.
   */
  constructor() {

        // Vérifie si le thème enregistré dans localStorage est 'dark'
        this._isDarkMode = localStorage.getItem('theme') === 'dark'; 

        // Applique le thème lors de la création du service
        this.applyTheme(); 
  } 

  /***************************************************/
  /**************   ⬇️    GETTERS    ⬇️   **************/
  /***************************************************/

  /** 
   * Vérifie si l'application est en mode sombre. 
   * @returns Une valeur booléenne.
   */
  public get isDarkMode(): boolean { return this._isDarkMode; }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/
  
  /** 
   * Initialise le thème de l'application web (applique le thème existant s'il y a un problème de synchronisation entre les pages).
   */
  public initializeTheme() { this.applyTheme(true); }

  /** 
   * Change le thème de l'application web.
   */
  public toggleTheme() {
    this._isDarkMode = !this.isDarkMode; // Inverse la valeur de isDarkMode
    this.applyTheme(); // Applique le nouveau thème
  }

  /********************************************/
  /********************************************/

  /** 
   * Applique le thème en fonction de son mode actuel ('sombre' ou 'clair').
   * @param initialize Si true, applique le thème en vérifiant si la class 'dark' existe déjà ou non.
   */
  private applyTheme(initialize = false) {

    // Si le mode du thème est en mode sombre, on lui applique la class pour affecté le monde sombre
    if(this._isDarkMode) {

      // Si le mode est en cours d'initialisation et que la class 'dark' existe déjà, on fait rien
      if(initialize && document.body.classList.contains('dark')) return;

      // Sinon, on lui ajoute la class en question au body
      document.body.classList.add('dark');

      // Enregistre le thème sombre dans localStorage
      localStorage.setItem('theme', 'dark'); 

    // Sinon, on lui enlève la class en question
    } else {

      // Si le mode est en cours d'initialisation et que la class 'dark' n'existe pas, on fait rien
      if(initialize && !document.body.classList.contains('dark')) return;

      // Sinon, on lui supprime la class en question au body
      document.body.classList.remove('dark'); // Supprime la classe 'dark' du body

      // Enregistre le thème clair dans localStorage
      localStorage.setItem('theme', 'light');
    }
  }
}
