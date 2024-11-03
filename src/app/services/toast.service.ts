import { Injectable } from '@angular/core';
import { ToastOptions } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { EToastColor } from '../enums/toast.color.enum';
import { EToastPosition } from '../enums/toast.position.enum';
import { IToastOptions } from '../interfaces/global/toast.options.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {

  /******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /******************************************************/
  
  private _toastOptions?: IToastOptions;

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
   * Vous pouvez configurer les paramètres de la notification toast en utilisant l'interface par défaut 
   * `ToastOptions`, en conjonction avec la nouvelle interface `IToastOptions`. Cela inclut les options 
   * `color` et `position`, qui peuvent être définies à l'aide des énumérations `EToastColor` et 
   * `EToastPosition` pour garantir que seules des valeurs valides soient utilisées.
   * 
   * Elle permet d'initialiser des options personnalisées tout en définissant pour certaines options 
   * des valeurs par défaut pour la notification.
   * 
   * @param options - Options de configuration pour les notifications toast (inclut les propriétés de 
   *                  l'interface `IToastOptions` étendue de l'interface `ToastOptions`).
   * 
   * @example
   * toastServiceInstance.toastOptions({
   *    color: EToastColor.PRIMARY,        // Énumération 'EToastColor' de l'interface 'IToastOptions'
   *    position: EToastPosition.BOTTOM    // Énumération 'EToastPosition' de l'interface 'IToastOptions'
   *    ... // Autre propriété de l'interface 'ToastOptions'
   * });
   */
  public set toastOptions(options: IToastOptions) {
    
    /**
     * Assigne un nouvel objet d'options de notification à `_toastOptions` en mettant en place des options par défaut si nécessaire.
     * Cela permettra d'éviter des répétitions dans la configuration des notifications toast, en garantissant que chaque notification 
     * utilise des paramètres cohérents tout en permettant des personnalisations spécifiques.
     */
    this._toastOptions = this.initializeDefaultToastOptions(options);
  }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/

  /**
   * Affiche une notification toast en utilisant les options fournies.
   * 
   * Cette méthode crée une instance de notification toast avec les options spécifiées, puis l'affiche à l'utilisateur.
   * Elle permet d'utiliser des options personnalisées tout en définissant pour certaines options des valeurs par défaut pour la notification.
   * 
   * @param toastOptions - Les options à utiliser pour configurer la notification toast 
   *                       conformément à l'interface par défaut `ToastOptions`.
   * @param resetOptions - Un paramètre optionnel qui détermine si les options de toast doivent être réinitialisées 
   *                       après l'affichage. La valeur par défaut est `true`.
   * @returns Une promesse qui se résout lorsque la notification toast a été présentée à l'utilisateur.
   */
  public present(toastOptions: IToastOptions | undefined = undefined, resetOptions: boolean = true): Promise<void> { 

    /**
     * On assigne (toastOptions) aux options par défaut (_toastOptions) si elles sont définies et que (toastOptions) est vide, 
     * Ensuite on met à jour (_toastOptions) avec (toastOptions) si aucune option n'est définie.
     * 
     * Sinon, on conserve leur valeur actuelle.
     */
    toastOptions = this._toastOptions && !toastOptions ? this._toastOptions : toastOptions;
    this._toastOptions = toastOptions && !this._toastOptions ? toastOptions : this._toastOptions;

    /**
     * Crée une instance de notification toast à partir des options fournies et l'affiche.
     * Finalement, on réinitialise les options pour la notification toast si le paramètre (resetOptions) est vrai.
     */
    return this.toastController.create(toastOptions).then(toast => toast.present())
      .finally(() => { if(resetOptions) this._toastOptions = undefined; });
  }

  /***********************************************************/
  /**************   ⬇️    MÉTHODES PRIVÉES   ⬇️   **************/
  /**********************************************************/

  /**
   * Initialise des options par défaut pour une notification toast en cas d'informations manquantes.
   *
   * Cette méthode renvoie un objet contenant des options de notification toast, 
   * combinant les paramètres fournis avec des valeurs par défaut. Les propriétés 
   * 'color' et 'position' sont omises pour utilisé ses types à travers les énumérations `EToastColor` et `EToastPosition`.
   *
   * @param toastOptions - Les options de configuration de la notification toast, excluant 'color' et 'position', 
   *                      avec des options spécifiques pour 'color' et 'position' basées sur les énumérations 
   *                      `EToastColor` et `EToastPosition`.
   *
   * @returns Un objet d'options de notification toast contenant les paramètres fournis combinés avec des valeurs par défaut : 
   *            - 'message' initialisé à la valeur fournie ou 'Notification reçue.' si non spécifié,
   *            - 'duration' initialisé à la valeur fournie ou '3000ms' si non spécifié,
   *            - 'color' initialisé à la valeur fournie ou 'undefined' si non spécifié,
   *            - 'position' initialisé à la valeur fournie ou 'en haut' si non spécifié,
   */
  private initializeDefaultToastOptions(toastOptions: Omit<ToastOptions, 'color' | 'position'> & { color?: EToastColor; position?: EToastPosition }): Omit<ToastOptions, 'color' | 'position'> & { color?: EToastColor; position?: EToastPosition } {

    /** 
     * Renvoi les options par défaut pour la notification toast en omettant 'color' et 'position'.
     */ 
    return {
      ...toastOptions, // Combine les options fournies avec les valeurs par défaut
      message: toastOptions.message || 'Notification reçue.', // Initialise le message de notification à 'Notification reçue.' si non fournie
      duration: toastOptions.duration || 3000, // Initialise la durée d'affichage à '300ms' si non fournie
      color: toastOptions.color || undefined, // Initialise la couleur à 'undefined' si non fournie
      position: toastOptions.position || EToastPosition.TOP // Initialise la position 'en haut' si non fournie
    };
  }
}
