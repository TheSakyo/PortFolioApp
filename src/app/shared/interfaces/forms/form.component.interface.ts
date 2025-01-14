import { FormGroup } from "@angular/forms";
import { ValidationErrorsWithMessageType } from "../../utils/types.utils";

export declare interface IFormComponent {

    /*****************************************************/
    /**************   ⬇️    PROPRIÉTÉS    ⬇️   **********/
    /****************************************************/

    /**
     * Indicateur d'état indiquant si le formulaire est en cours de soumission.
     */
    isSubmitting: boolean,

    /**
     * Messages d'erreurs pour chaque champ par formulaire.
     */
    validationErrorsMessages: { [key: string]: ValidationErrorsWithMessageType },

    /*****************************************************/
    /**************   ⬇️    ÉVÈNEMENTS    ⬇️   **********/
    /****************************************************/

    /**
     * Méthode appelée lors de la saisie d'un champ du formulaire demandé.
     * @param event - L'évènement déclenché lors de la saisie.
     * @param formName - Nom du formulaire à vérifier.
     */
    onInput(event: Event, formName?: string): void,

    /**
     * Méthode appelée lors de la soumission d'un formulaire.
     */
    onSubmit(): void,

    /**
     * Méthode appelée lors de la réinitialisation du formulaire demandé.
     * @param formName - Nom du formulaire à réinitialiser.
     */
    onReset(formName?: string): void

    /*****************************************************/
    /**************   ⬇️    MÉTHODES    ⬇️   ************/
    /****************************************************/

    /**
     * Méthode pour obtenir le formulaire demandé.
     * @param formName - Nom du formulaire
     * @returns Le formulaire correspondant au nom donné.
     * @remarks Le nom du formulaire est facultatif.
     */
    form(formName?: string): FormGroup,

    /**
     * Méthode pour initialiser les messages d'erreurs du formulaire demandé
     * @param formName - Nom du formulaire
     * @remarks Le nom du formulaire est facultatif.
     */
    initErrorsMessages(formName?: string): void,

    /**
     * Vérifie si le champ en question du formulaire demandé a été 'touché' et contient une erreur spécifique.
     * @param controlName - Le nom du champ à vérifier.
     * @param error - Le type d'erreur à vérifier.
     * @param formName - Le nom du formulaire à vérifier.
     * @remarks Le nom du formulaire est facultatif.
     */
     containsError(controlName: string, error: string, formName?: string): boolean,

    /**
     * Récupère le message d'erreur associé à un champ du formulaire demandé.
     * @param controlName - Le nom du champ à vérifier.
     * @param error - Le type d'erreur à vérifier.
     * @param formName - Le nom du formulaire à vérifier.
     * @remarks Le nom du formulaire est facultatif.
     */
     errorMessage(controlName: string, error: string, formName?: string): string | undefined
}