import { AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Type pour les validations des formulaires.
 * @remarks - On utilise soit un {@link ValidatorFn} ou un tableau {@link ValidatorFn[]}.
 * @type {ValidatorFn | ValidatorFn[]}
 */
export type ValidatorsFnType = ValidatorFn | ValidatorFn[];

/**
 * Type pour les validations des formulaires
 * @remarks - On utilise soit un {@link AsyncValidatorFn} ou un tableau de {@link AsyncValidatorFn[]}.
 * @type {ValidatorFn[] | AsyncValidatorFn[]}
 */
export type AsyncValidatorsFnType = AsyncValidatorFn | AsyncValidatorFn[]

/**
 * Type pour les erreurs de validation avec un message personnalisé.
 * @type {ValidationErrorsWithMessageType}
 */
export type ValidationErrorsWithMessageType = { [key: string]: { type: keyof ValidationErrors, message: string }[] };