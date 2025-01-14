import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormBuilder, FormControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import { NotFoundError } from "../utils/exceptions/NotFoundError";
import { AsyncValidatorsFnType, ValidationErrorsWithMessageType, ValidatorsFnType } from "../utils/types.utils";
import { AsynchroneCheckUtils } from "../utils/asynchrone-check.utils";
import { IFormError } from "../interfaces/forms/form.error.interface";

@Injectable({ providedIn: 'root' })
export class FormService {

  /*********************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /********************************************************/

  // Variable pour les messages d'erreurs des contrôles des formulaires
  private controlErrorMessages: { [key: string]: { [key: string]: Set<IFormError> } } = {};

  // Variable pour les formulaires
  private forms: { [key: string]: FormGroup } = {};

  // Variable pour le nom du formulaire actuel
  private currentNameOfForm!: string;

  /***********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /**********************************************************/

  /**
   * Constructeur du service pour gérer les formulaires.
   * @param fb - Service de création de formulaires pour gérer les formulaires.
   */
  constructor(private fb: FormBuilder) {}

  /******************************************************/
  /**************   ⬇️    SETTERS    ⬇️   **************/
  /*****************************************************/

  /**
   * Sélectionne un formulaire par son nom.
   * @param formName - Le nom du formulaire à sélectionner.
   */
  public set selectForm(formName: string) { this.currentNameOfForm = formName; }

  /*******************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /******************************************************/

  /**
   * Crée un nouveau formulaire de type {@link FormGroup}.
   * @param formName - Le nom du formulaire actuel.
   * @param controls - Les contrôles du formulaire actuel.
   * @param options - Les options pour le formulaire.
   */
  public createForm(formName: string, controls: { [key: string]: FormControl }, options?: AbstractControlOptions | null): void {
    this.forms[formName] = this.fb.group(controls, options);
    this.currentNameOfForm = formName;
  }

  /**
   * Renvoie un formulaire spécifique.
   * @param formName - Le nom du formulaire à récupérer.
   * @throws NotFoundError - Une erreur si le formulaire n'est pas trouvé.
   * @returns Le formulaire spécifique.
   */
  public form(formName: string = this.currentNameOfForm): FormGroup {

    // Vérifie si le formulaire existe.
    if(!this.forms[formName]) throw new NotFoundError('The form \'' + formName + '\' is not found. Please create it before.');

    // Renvoie le formulaire actuel.
    return this.forms[formName];
  }

  /**
   * Marque un contrôle spécifique du formulaire actuel comme étant 'touché'.
   * @param options - Les options pour marquer le contrôle comme 'touché'.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   * @remarks Les options possibles sont : '**controlName**', '**onlySelf**' et '**emitEvent**'.
   *          Si aucun nom de contrôle n'est spécifié, tous les contrôles du formulaire actuel seront marqués comme 'touchés'.
   */
  public markAsTouched(options: { controlName?: string, onlySelf?: boolean; emitEvent?: boolean; } = {}): void {

    const markOptions = {
      onlySelf: options.onlySelf ?? undefined,
      emitEvent: options.emitEvent ?? undefined
    };

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    if(options.controlName) this.forms[this.currentNameOfForm]?.get(options.controlName)?.markAsTouched(markOptions);
    else this.forms[this.currentNameOfForm]?.markAllAsTouched(markOptions);
  }

  /********************************************/
  /********************************************/

  /**
   * Définit les validations pour un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à valider.
   * @param validators - Les validateurs à appliquer.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public addControlValidations(controlName: string, validators: ValidatorsFnType | AsyncValidatorsFnType): void {

        if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

        if(AsynchroneCheckUtils.isObservable(validators) || AsynchroneCheckUtils.isPromise(validators))
          this.forms[this.currentNameOfForm]?.get(controlName)?.addAsyncValidators(validators as AsyncValidatorFn);
        else this.forms[this.currentNameOfForm]?.get(controlName)?.addValidators(validators);

        this.forms[this.currentNameOfForm]?.get(controlName)?.updateValueAndValidity();
  }

  /**
   * Supprime les validations d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à supprimer les validations.
   * @param validators - Les validateurs à supprimer.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public removeControlValidations(controlName: string, validators: ValidatorsFnType | AsyncValidatorsFnType): void {

      if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

      if(AsynchroneCheckUtils.isObservable(validators) || AsynchroneCheckUtils.isPromise(validators))
        this.forms[this.currentNameOfForm]?.get(controlName)?.removeAsyncValidators(validators as AsyncValidatorFn);
      else this.forms[this.currentNameOfForm]?.get(controlName)?.removeValidators(validators);

      this.forms[this.currentNameOfForm]?.get(controlName)?.updateValueAndValidity();
  }

  /**
   * Supprime toutes les validations d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à supprimer les validations.
   * @param clearAsyncValidators - Une valeur booléenne pour vérifier si on supprime les validateurs asynchrones ou non.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public clearControlValidations(controlName: string, clearAsyncValidators: boolean): void {

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    if(clearAsyncValidators) this.forms[this.currentNameOfForm]?.get(controlName)?.clearAsyncValidators();
    else this.forms[this.currentNameOfForm]?.get(controlName)?.clearValidators();

    this.forms[this.currentNameOfForm]?.get(controlName)?.updateValueAndValidity();
  }

  /********************************************/
  /********************************************/

  /**
   * Initialise les messages d'erreurs par défaut pour les contrôles du formulaire actuel.
   * @param validErrors - Un objet représentant les erreurs de validation avec leur message associé.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   *                        ou si aucune erreur n'est trouvée pour ce contrôle.
   */
  public initDefaultErrorMessages(validErrors: ValidationErrorsWithMessageType): void {
    this.updateControlErrors(validErrors, true);
  }

  /**
   * Ajoute une erreur à un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à ajouter l'erreur.
   * @param error - L'erreur qui doit être ajoutée.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public addControlError(controlName: string, error: IFormError): void {

    if(!this.controlErrorMessages[this.currentNameOfForm]) this.controlErrorMessages[this.currentNameOfForm] = {};
    if(!this.controlErrorMessages[this.currentNameOfForm][controlName]) this.controlErrorMessages[this.currentNameOfForm][controlName] = new Set();
    if(!this.controlErrorMessages[this.currentNameOfForm][controlName].has(error)) this.controlErrorMessages[this.currentNameOfForm][controlName].add(error);
  }
  /**
   * Met à jour les messages d'erreurs pour les contrôles du formulaire actuel.
   * @param validErrors - Un objet représentant les erreurs de validation avec leur message associé.
   * @param throwIfNotFound - Une valeur booléenne pour vérifier si on lance une erreur si aucune erreur n'est trouvée.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné
   *                        ou si aucune erreur n'est trouvée pour ce contrôle, si 'throwIfNotFound' est à true.
   */
  public updateControlErrors(validErrors: ValidationErrorsWithMessageType, throwIfNotFound = false): void {

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    for(let key in validErrors) {

      const form: FormGroup | null = this.forms[this.currentNameOfForm];
      const formControl: AbstractControl<any, any> = form?.controls[key];
      if(!formControl) continue;

      validErrors[key].forEach(error => {

        const errorName: string = error.type as string;

        if(formControl.errors && Object.keys(formControl.errors).includes(errorName))
          this.addControlError(key, { name: errorName, message: error.message });
        else {
          if(throwIfNotFound) throw new NotFoundError('No error found for this control of \'' + this.currentNameOfForm + '\' form.');
          else this.removeControlError(key, errorName);
        }
      });
    }
  }

  /**
   * Supprime une erreur d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à supprimer l'erreur.
   * @param errorName - Le nom de l'erreur à supprimer.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné
   *                          ou si aucune erreur n'est trouvée pour ce contrôle.
   */
  public removeControlError(controlName: string, errorName: string): void {
    
    if(!this.controlErrorMessages[this.currentNameOfForm] && !this.controlErrorMessages[this.currentNameOfForm][controlName]) return;

    const error: IFormError | null = this.getControlError(controlName, errorName, false);
    const errors: ValidationErrors | null = this.forms[this.currentNameOfForm]?.controls[controlName].errors;

    if(errors) delete errors[errorName];
    if(error) this.controlErrorMessages[this.currentNameOfForm][controlName].delete(error)
  }

  /**
   * Renvoie une erreur spécifique d'un contrôle du formulaire actuel.
   * @param controlName - Le nom du contrôle à récupérer l'erreur.
   * @param errorName - Le nom de l'erreur à récupérer.
   * @param checkBefore - Une valeur booléenne pour vérifier si on vérifie si l'erreur existe avant de la supprimer.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   * @returns Le message d'erreur associé à l'erreur du contrôle.
   */
  public getControlError(controlName: string, errorName: string, checkBefore: boolean = true): IFormError | null {

    if(checkBefore && !this.checkControlErrors(controlName, errorName)) return null;

    const errors: Set<IFormError> = this.controlErrorMessages[this.currentNameOfForm][controlName];
    return Array.from(errors).find((error: IFormError) => error.name === errorName) as IFormError
  }

  /**
   * Vérifie si un contrôle du formulaire actuel a des erreurs spécifiques.
   * @param controlName - Le nom du contrôle à vérifier.
   * @param errorNames - Les noms des erreurs à vérifier.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public checkControlErrors(controlName: string, ...errorNames: string[]): boolean {

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    return this.containsErrorsFromFormControl(this.currentNameOfForm,
        controlName, ...errorNames);
  }

  /********************************************/
  /********************************************/

  /**
   * Vérifie si un contrôle du formulaire actuel a des erreurs.
   * @param formName - Le nom du formulaire actuel.
   * @param controlName - Le nom du contrôle à vérifier.
   * @param errorNames - Les noms des erreurs à vérifier.
   */
  private containsErrorsFromFormControl(formName: string, controlName: string, ...errorNames: string[]): boolean {

    const formErrors: { [key: string]: Set<IFormError> } = this.controlErrorMessages[formName];
    const controlErrors: Set<IFormError> = formErrors ? formErrors[controlName] : new Set();

    const isEmpty: boolean = controlErrors.size <= 0;

    return isEmpty || errorNames.some((errorName: string) =>{

      return controlErrors.entries().next().value[0].name.toLocaleLowerCase() === errorName.toLocaleLowerCase()
    });
  }
}
