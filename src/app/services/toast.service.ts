import { Injectable } from '@angular/core';
import { ToastOptions } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { EToastColor } from '../enums/toast.color.enum';
import { EToastPosition } from '../enums/toast.position.enum';

@Injectable({ providedIn: 'root' })
export class ToastService {

  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/
  
  private _toastOptions?: ToastOptions;

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/

  /**
   * Constructeur du service les notifications toast.
   * @param toastController - Contrôleur permettant de gérer l'affichage des notifications toast.
   */
  constructor(private toastController: ToastController) {} 

  /***************************************************/
  /**************   ⬇️    SETTERS    ⬇️   **************/
  /***************************************************/

  /**
   * Définit les options de configuration des notifications toast.
   * 
   * Utilisez cette propriété pour configurer les paramètres de la notification toast, incluant l'interface par défaut
   * `ToastOptions` ainsi que les options `color` et `position` en utilisant les énumérations `EToastColor` et `EToastPosition`.
   * 
   * @param options - Les options de configuration de la notification toast, avec des énumérations spécifiques pour `color` et `position`, 
   *                  ainsi que les autres paramètres de `ToastOptions`.
   * 
   * @example
   * toastServiceInstance.toastOptions({
   *    color: EToastColor.PRIMARY,            // type : EToastColor
   *    position: EToastPosition.BOTTOM    // type : EToastPosition
   *    ... // autre propriété de ToastOptions
   * });
   */
  public set toastOptions(options: Omit<ToastOptions, 'color' | 'position'> & { color?: EToastColor; position?: EToastPosition }) {
      
    /**
     * Assigne un nouvel objet d'options de notification à `_toastOptions`. 
     * Les options contiennent toutes les propriétés d'options existantes avec une nouvelle gestion des propriétés `color` et `position`.
     */
    this._toastOptions = { 
        
      ...options, // Copie les propriétés existantes de `options` dans le nouvel objet.
      color: options.color, // Récupère l'énumération de la couleur de la notification toast.
      position: options.position, // Récupère l'énumération de la position de la notification toast.
      duration: options.duration ?? 3000, // Définit la durée par défaut de la notification toast à 3000ms.

      /**
       * Ajoute un bouton par défaut avec le texte 'OK' et un rôle 'cancel'.
       */
      buttons: options.buttons ?? [{ 
          text: 'OK',
          role: 'cancel'
      }],
    };
  }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/

  /**
   * Affiche une notification toast en utilisant les options fournies.
   * 
   * Cette méthode crée une instance de notification toast avec les options spécifiées, puis l'affiche à l'utilisateur.
   * Elle permet d'utiliser des options personnalisées tout en définissant des options par défaut pour la notification.
   * 
   * @param toastOptions - Les options à utiliser pour configurer la notification toast 
   *                       conformément à l'interface par défaut `ToastOptions`.
   * @param resetOptions - Un paramètre optionnel qui détermine si les options de toast doivent être réinitialisées 
   *                       après l'affichage. La valeur par défaut est `true`.
   * @returns Une promesse qui se résout lorsque la notification toast a été présentée à l'utilisateur.
   */
  public present(toastOptions: Omit<ToastOptions, 'color' | 'position'> & { color?: EToastColor; position?: EToastPosition }, resetOptions = true): Promise<void> { 
    
    /** 
     * Définit les options par défaut pour la notification toast en omettant 'color' et 'position'.
     */ 
    const defaultOptions: Omit<ToastOptions, 'color' | 'position'> & { color?: EToastColor; position?: EToastPosition } = {
      ...toastOptions, // Combine les options fournies avec les valeurs par défaut.
      duration: 3000, // Durée d'affichage du toast en millisecondes.
      buttons: [{ text: 'OK', role: 'cancel' }], // Bouton par défaut avec texte 'OK' qui annule le toast.
      color: undefined, // Initialisation de la couleur à 'undefined', à remplacer si spécifié.
      position: EToastPosition.TOP // Position par défaut du toast.
    };

    // Vérifie si aucune option de toast n'est définie et si des options pour la notification toast ont été fournies, alors on met en place des options par défaut.
    if(!this._toastOptions && toastOptions) this.toastOptions = defaultOptions;

    // Crée une instance de notification toast à partir des options fournies et l'affiche.
    return this.toastController.create(toastOptions).then(toast => toast.present())
      .finally(() => { if(resetOptions) this._toastOptions = undefined; }); // Réinitialise les options pour la notification toast si le paramètre resetOptions est vrai.
  }
}
