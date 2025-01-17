import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface IFormError {

    /*****************************************************/
    /**************   ⬇️    PROPRIÉTÉS    ⬇️   **********/
    /****************************************************/

    /**
     * Type de l'erreur.
     */
    type: string,

    /**
     * Message de l'erreur.
     */
    message: string

    /**
     * Fonction de validation.
     * <br/><br/><br/><br/>
     * @example Voici quelques exemples avec l'utilisation de la propriété '**validator**' :
     *
     *     // ⬇️ Exemple avec 'Validators' ⬇️//
     *     {
     *      type: 'required', // Type de validation
     *      message: 'Le champ est obligatoire.', // Message d'erreur
     *      validator: Validators.required // Validation requise
     *     }
     *
     *     // ⬇️ Exemple avec une validation personnalisée ⬇️//
     *     {
     *      type: 'test', // Type de validation
     *      message: 'Le champ ne doit pas contenir le mot "test".', // Message d'erreur
     *      validator: validateTest() // Validation personnalisée
     *     }
     *
     *     ...
     *
     *     // Fonction de validation personnalisée 'validateTest'
     *     function validateTest(): ValidatorFn {
     *      return (control: AbstractControl): ValidationErrors | null => {
     *          if (control.value === 'test') return { test: { message: 'Le champ ne doit pas contenir le mot "test".' }
     *          return null;
     *      };
     */
    validator: ValidatorFn | AsyncValidatorFn
}