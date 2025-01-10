import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
   * `ToastOptions` en conjonction avec la nouvelle interface `IToastOptions`. 
   * 
   * En effet grâce à cette nouvelle interface, certaines propriétés sont omises pour plutôt utiliser 
   * des types d'énumérations et ainsi garantir que seules des valeurs valides soient utilisées.
   * 
   * Ce setter initialise des options personnalisées tout en définissant des valeurs par défaut 
   * pour la notification.
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
     * Tout d'abord, on vérifie si des options de notification toast initiales (_toastOptions) sont définies.
     * 
     * Si c'est le cas et que les options de notification toast fournies (toastOptions) sont vides, 
     * on assigne la propriété '_toastOptions' à celle de 'toastOptions'. 
     * 
     * Sinon, on conserve la valeur actuelle de la propriété 'toastOptions'.
     */
    toastOptions = this._toastOptions && !toastOptions ? this._toastOptions : toastOptions;

    /**
     * Si les options de notification toast fournies (toastOptions) sont définies après la vérification précédente, 
     * on met à jour les options de notification toast initiales (_toastOptions) 
     * avec cette valeur à l'aide de son setter (toastOptions()).
     */
    if(toastOptions) this.toastOptions = toastOptions;

    /**
     * Crée une instance de notification toast à partir des options de configuration de la notification et l'affiche.
     * Finalement, on réinitialise les options pour la notification toast si le paramètre (resetOptions) est vrai.
     */
    return this.toastController.create(this._toastOptions).then(toast => toast.present())
      .finally(() => { if(resetOptions) this._toastOptions = undefined; });
  }

  /***********************************************************/
  /**************   ⬇️    MÉTHODES PRIVÉES   ⬇️   **************/
  /**********************************************************/

  /**
   * Initialise les options par défaut pour une notification toast en cas d'informations manquantes.
   *
   * Cette méthode renvoie un objet combinant les options fournies avec des valeurs par défaut. 
   * Certaines propriétés sont omises pour utiliser des types d'énumérations grâce à l'interface `IToastOptions` étendant `ToastOptions`.
   *
   * @param toastOptions - Options de configuration de la notification toast, excluant 'color' et 'position'.
   *
   * @returns Un objet contenant : 
   *            - 'message' : valeur fournie ou 'Notification reçue.' par défaut,
   *            - 'duration' : valeur fournie ou '3000ms' par défaut,
   *            - 'color' : valeur fournie ou 'undefined' par défaut,
   *            - 'position' : valeur fournie ou 'en haut' par défaut.
   */
  private initializeDefaultToastOptions(toastOptions: IToastOptions): IToastOptions {

    /** 
     * Renvoi les options par défaut pour la notification toast en omettant 'color' et 'position'.
     */ 
    return {
      ...toastOptions, // Combine les options fournies avec les valeurs par défaut
      message: toastOptions.message || 'Notification reçue.', // Initialise le message de notification à 'Notification reçue.' si non fournie
      duration: toastOptions.duration || 3000, // Initialise la durée d'affichage à '300ms' si non fournie
      color: toastOptions.color || undefined, // Initialise la couleur à 'undefined' si non fournie
      position: toastOptions.position || EToastPosition.TOP, // Initialise la position 'en haut' si non fournie
      cssClass: this.normalizeCssClass(toastOptions.cssClass) // Normalise les options de classe CSS pour les notifications toast
    };
  }

  /**
   * Normalise les options de classe CSS pour les notifications toast.
   *
   * Cette méthode garantit que la classe CSS 'toast-custom-class' est incluse, 
   * quel que soit le type de l'option `cssClass` fourni : chaîne, tableau ou non défini.
   *
   * @param cssClass - La ou les classes CSS fournies, qui peuvent être 
   *                   une chaîne de caractères, un tableau de chaînes de caractères, ou non définies.
   *
   * @returns Un tableau de chaînes de caractères contenant les classes CSS fournies combinées avec 'toast-custom-class'.
   */
  private normalizeCssClass(cssClass?: string | string[]): string[] {

    const defaultClass = 'toast-custom-class'; // Classe CSS par défaut
    let cssClassArray: string[] = [defaultClass]; // Initialise le tableau avec la classe CSS par défaut

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Si l'option 'cssClass' est défini comme une chaîne, on redéfinit le tableau proprement
    if(typeof cssClass === 'string') cssClassArray = [cssClass, ...cssClassArray];

    /**
     * Sinon, si l'option 'cssClass' est déjà un tableau et qu'il contient pas la classe CSS par défaut, 
     * on redéfinit le tableau proprement en combinant les valeurs avec la classe par défaut.
     */
    else if(Array.isArray(cssClass) && cssClass.includes(defaultClass) === false) cssClassArray = [...cssClass, ...cssClassArray];

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    return cssClassArray; // On renvoi le tableau avec la classe CSS par défaut
  }
}
