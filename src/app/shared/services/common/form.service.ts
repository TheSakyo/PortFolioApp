import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn,
        FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NotFoundError } from "@portfolio/shared/exceptions/NotFoundError";
import { NotValidError } from "@portfolio/shared/exceptions/NotValidError";
import { IFormError } from "@portfolio/shared/interfaces/forms/form.error.interface";
import { AsynchroneCheckUtils } from "@portfolio/shared/utils/asynchrone-check.utils";
import { AsyncValidatorsFn, FormControlValue, ValidationErrorsWithMessage,
        ValidatorsFn } from "@portfolio/shared/utils/types.utils";

@Injectable({ providedIn: 'root' })
export class FormService {

  /*********************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
  /********************************************************/

  /**
   * @private
   * Les messages d'erreurs pour les contrôles du formulaire actuel.
   */
  private controlErrorMessages: { [key: string]: ValidationErrorsWithMessage } = {};

  /**
   * @private
   * Les formulaires créés.
   */
  private forms: { [key: string]: FormGroup } = {};

  /**
   * @private
   * Le nom du formulaire actuel.
   */
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
   * @param controlValues - Les valeurs par défaut des contrôles du formulaire.
   * @param options - Les options pour le formulaire.
   * @throws NotValidError - Une erreur si les valeurs des contrôles sont de type {@link AbstractControl}.
   */
  public createForm(formName: string, controlValues: FormControlValue, options?: AbstractControlOptions | null): void {

    if(Object.values(controlValues).some(value => value !== null &&
        value.value instanceof AbstractControl)) throw new NotValidError('The control values must be of type AbstractControl.');

    const controls: { [key: string]: AbstractControl } = {};
    Object.entries(controlValues).forEach(([key, value]) => {
      controls[key] = new FormControl(value.value, value.options);
    });

    this.forms[formName] = this.fb.group({ ...controls }, options);
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
   * Renvoie un contrôle spécifique du formulaire actuel.
   * @param formName - Le nom du formulaire à récupérer.
   * @param controlName - Le nom du contrôle à récupérer.
   * @returns Le contrôle spécifique du formulaire actuel.
   */
  public formControl(formName: string, controlName: string): AbstractControl | null {
    return this.form(formName) ? this.form(formName).get(controlName) : null;
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

    if(options.controlName) this.formControl(this.currentNameOfForm, options.controlName)?.markAsTouched(markOptions);
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
  public addControlValidations(controlName: string, validators: ValidatorsFn | AsyncValidatorsFn): void {

        if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

        if(AsynchroneCheckUtils.isObservable(validators) || AsynchroneCheckUtils.isPromise(validators))
          this.formControl(this.currentNameOfForm, controlName)?.addAsyncValidators(validators as AsyncValidatorsFn);
        else this.formControl(this.currentNameOfForm, controlName)?.addValidators(validators);

        this.formControl(this.currentNameOfForm, controlName)?.updateValueAndValidity();
  }

  /**
   * Supprime les validations d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à supprimer les validations.
   * @param validators - Les validateurs à supprimer.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public removeControlValidations(controlName: string, validators: ValidatorsFn | AsyncValidatorsFn): void {

      if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

      if(AsynchroneCheckUtils.isObservable(validators) || AsynchroneCheckUtils.isPromise(validators))
        this.formControl(this.currentNameOfForm, controlName)?.removeAsyncValidators(validators as AsyncValidatorsFn);
      else this.formControl(this.currentNameOfForm, controlName)?.removeValidators(validators);

      this.formControl(this.currentNameOfForm, controlName)?.updateValueAndValidity();
  }

  /**
   * Vérifie si un contrôle spécifique du formulaire actuel contient des validations spécifiques.
   * @param controlName - Le nom du contrôle à vérifier.
   * @param validator - Le validateur à vérifier.
   */
  public containsControlValidations(controlName: string, validator: ValidatorFn | AsyncValidatorFn): boolean {

        if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

        if(AsynchroneCheckUtils.isObservable(validator) || AsynchroneCheckUtils.isPromise(validator))
          return this.formControl(this.currentNameOfForm, controlName)?.hasAsyncValidator(validator as AsyncValidatorFn) ?? false;
        else return this.formControl(this.currentNameOfForm, controlName)?.hasValidator(validator) ?? false;
    }

  /**
   * Supprime toutes les validations d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à supprimer les validations.
   * @param clearAsyncValidators - Une valeur booléenne pour vérifier si on supprime les validateurs asynchrones ou non.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public clearControlValidations(controlName: string, clearAsyncValidators: boolean): void {

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    if(clearAsyncValidators) this.formControl(this.currentNameOfForm, controlName)?.clearAsyncValidators();
    else this.formControl(this.currentNameOfForm, controlName)?.clearValidators();

    this.formControl(this.currentNameOfForm, controlName)?.updateValueAndValidity();
  }

  /********************************************/
  /********************************************/

  /**
   * Initialise les messages d'erreurs pour les contrôles du formulaire spécifié.
   * @param formName - Le nom du formulaire à initialiser les erreurs.
   * @param validErrors - Les erreurs de validation par défaut.
   * @throws NotFoundError - Une erreur si le formulaire n'est pas trouvé.
   */
  public initFormErrorMessages(formName: string, validErrors: ValidationErrorsWithMessage): void {

    if(!this.forms[formName]) throw new NotFoundError('The form \'' + formName + '\' is not found. Please create it before.');
    Object.keys(validErrors).forEach(controlName => this.initializeErrorMessages(formName, controlName, validErrors, false));
  }

  /**
   * Renvoie les erreurs enregistrées pour un formulaire spécifique.
   * @param formName - Le nom du formulaire à récupérer les erreurs.
   * @throws NotFoundError - Une erreur si le formulaire n'est pas trouvé.
   * @returns Les erreurs associées au formulaire actuel.
   */
  public getErrorMessages(formName: string = this.currentNameOfForm): ValidationErrorsWithMessage  {

    if(!this.forms[formName]) throw new NotFoundError('The form \'' + formName + '\' is not found. Please create it before.');
    return this.controlErrorMessages[formName];
  }

  /**
   * Met à jour les messages d'erreurs pour les contrôles du formulaire spécifié.
   * @param formName - Le nom du formulaire à mettre à jour les erreurs.
   * @param controlName - Le nom du contrôle à mettre à jour les erreurs.
   * @throws NotFoundError - Une erreur si le formulaire n'est pas trouvé
   */
  public updateFormControlErrors(formName: string, controlName: string): void {
    this.initializeErrorMessages(formName, controlName, this.getErrorMessages(formName), true);
  }

  /**
   * Ajoute une erreur à un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à ajouter l'erreur.
   * @param error - L'erreur qui doit être ajoutée.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   */
  public addControlError(controlName: string, error: IFormError): void {

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    if(!this.containsControlValidations(controlName, error.validator)) {

      if(!this.controlErrorMessages[this.currentNameOfForm]) this.controlErrorMessages[this.currentNameOfForm] = {};

      if(!this.controlErrorMessages[this.currentNameOfForm][controlName])
        this.controlErrorMessages[this.currentNameOfForm][controlName] = [];

      if(!this.controlErrorMessages[this.currentNameOfForm][controlName].includes(error))
        this.controlErrorMessages[this.currentNameOfForm][controlName].push(error);

      this.addControlValidations(controlName, error.validator);
    }
  }

  /**
   * Supprime une erreur d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à supprimer l'erreur.
   * @param error - L'erreur qui doit être supprimée.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné
   *                          ou si aucune erreur n'est trouvée pour ce contrôle.
   */
  public removeControlError(controlName: string, error: IFormError): void {
    
    if(!this.controlErrorMessages[this.currentNameOfForm] || !this.controlErrorMessages[this.currentNameOfForm][controlName]) return;

    const controlErrors: IFormError[] = this.controlErrorMessages[this.currentNameOfForm][controlName];
    const controlError: IFormError | null = this.getControlError(controlName, error.type);

    if(controlError) controlErrors.splice(controlErrors.indexOf(controlError), 1);
    if(this.containsControlValidations(controlName, error.validator)) this.removeControlValidations(controlName, error.validator);
  }

  /**
   * Renvoie une erreur spécifique d'un contrôle du formulaire actuel.
   * @param controlName - Le nom du contrôle à récupérer l'erreur.
   * @param errorType - Le nom de l'erreur à récupérer.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné.
   * @returns Le message d'erreur associé à l'erreur du contrôle.
   */
  public getControlError(controlName: string, errorType: string): IFormError | null {
    const errors: IFormError[] = this.getControlErrors(controlName);
    return Array.from(errors).find((error: IFormError) => error.type === errorType) as IFormError
  }

  /**
   * Renvoie les erreurs d'un contrôle spécifique du formulaire actuel.
   * @param controlName - Le nom du contrôle à récupérer les erreurs.
   * @returns Les erreurs associées au contrôle.
   */
  public getControlErrors(controlName: string): IFormError[] {

    const errors: { [key: string]: IFormError[] } = this.controlErrorMessages[this.currentNameOfForm];
    return errors ? errors[controlName] : [];
  }

  /**
   * Vérifie si un contrôle du formulaire actuel a des erreurs spécifiques.
   * @param controlName - Le nom du contrôle à vérifier.
   * @param errorTypes - Les noms des erreurs à vérifier.
   * @throws NotFoundError - Une erreur si aucun formulaire n'est sélectionné
   *                         ou si le contrôle n'est pas trouvé.
   * @returns Une valeur booléenne pour vérifier si le contrôle a des erreurs spécifiques.
   */
  public checkControlErrors(controlName: string, ...errorTypes: string[]): boolean {

    if(!this.currentNameOfForm) throw new NotFoundError('No form selected. Please select a form before.');

    const formControl: AbstractControl | null = this.formControl(this.currentNameOfForm, controlName);
    if(!formControl) throw new NotFoundError('The control \'' + controlName + '\' is not found in the form \'' + this.currentNameOfForm + '\'.');

    const validSelectedErrors: IFormError[] = this.getValidErrorsFromFormControl(this.currentNameOfForm, controlName, ...errorTypes);
    return validSelectedErrors.some((error: IFormError) => error.validator(formControl) != null);
  }

  /********************************************/
  /********************************************/

  /**
   * Récupère tous les messages d'erreurs valides pour un contrôle spécifique du formulaire en question.
   * @param formName - Le nom du formulaire actuel.
   * @param controlName - Le nom du contrôle à vérifier.
   * @param errorTypes - Les noms des erreurs à vérifier.
   * @returns Une valeur booléenne pour vérifier si le contrôle a des erreurs spécifiques.
   */
  private getValidErrorsFromFormControl(formName: string, controlName: string, ...errorTypes: string[]): IFormError[] {

    const formErrors: { [key: string]: IFormError[] } = this.controlErrorMessages[formName];
    const controlErrors: IFormError[] = formErrors ? formErrors[controlName] ?? [] : [];

    return controlErrors.length > 0 ? Array.from(controlErrors.values()).filter((error: IFormError) =>
        errorTypes.includes(error.type)) : [];
  }

  /**
   * Initialise les messages d'erreurs pour un contrôle spécifique du formulaire en question.
   * @param formName - Le nom du formulaire à initialiser les erreurs.
   * @param controlName - Le nom du contrôle à initialiser les erreurs.
   * @param validErrors - Les erreurs de validation par défaut.
   * @param isUpdating - Une valeur booléenne pour vérifier si on met à jour les erreurs.
   */
  private initializeErrorMessages(formName: string, controlName: string, validErrors: ValidationErrorsWithMessage,
                                  isUpdating: boolean): void {

    const errors: IFormError[] = [];

    const lastForm: string = this.currentNameOfForm ?? formName;
    this.currentNameOfForm = formName;

    if(!validErrors[controlName]) return;

    validErrors[controlName].forEach(error => {
      if(!isUpdating) errors.push(error);
    });

    const requireError: IFormError | undefined = errors.find(error => error.type === 'required');
    if(requireError) {
      errors.splice(errors.indexOf(requireError), 1);
      errors.unshift(requireError);
    }

    errors.forEach(error => this.reloadControlError(controlName, error));
    this.currentNameOfForm = lastForm;
  }

  /**
   * Recharge une erreur pour un contrôle spécifique du formulaire en question.
   * @param controlName - Le nom du contrôle à recharger l'erreur.
   * @param error - L'erreur qui doit être rechargée.
   */
  private reloadControlError(controlName: string, error: IFormError): void {
    this.removeControlError(controlName, error);
    this.addControlError(controlName, error);
  }
}
