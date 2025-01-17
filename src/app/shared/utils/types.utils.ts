import { AsyncValidatorFn, FormControlOptions, ValidatorFn } from "@angular/forms";
import { IFormError } from "@portfolio/shared/interfaces/forms/form.error.interface";

/**
 * Type pour les validations des formulaires.
 * @remarks - On utilise soit un {@link ValidatorFn} ou un tableau {@link ValidatorFn[]}.
 */
export type ValidatorsFn = ValidatorFn | ValidatorFn[];

/**
 * Type pour les validations des formulaires
 * @remarks - On utilise soit un {@link AsyncValidatorFn} ou un tableau de {@link AsyncValidatorFn[]}.
 */
export type AsyncValidatorsFn = AsyncValidatorFn | AsyncValidatorFn[]

/**
 * Type pour les erreurs de validation avec un message personnalisé.
 * @see  IFormError
 */
export type ValidationErrorsWithMessage = { [key: string]: IFormError[] };

/**
 * Type pour les valeurs des formulaires.
 */
export type FormControlValue = { [key: string]: { value: any, options?: FormControlOptions } };

/**
 * Type pour les erreurs de contrôle des formulaires (utilisé lors de la vérification des erreurs).
 */
export type FormControlError = { targetName: string, type: string | 'ANY' }