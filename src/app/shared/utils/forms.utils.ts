import { FormService } from "../services/form.service";

export abstract class FormsUtils {

    /**
     * @private
     * Service de gestion des formulaires.
     */
    private static formService: FormService;

    /**
     * Définit le service de gestion des formulaires.
     * @param formService - Le service de gestion des formulaires.
     */
    public static setFormService(formService: FormService) { this.formService = formService; }

    /**
     * Vérifie si le champ en question du formulaire a été 'touché'.
     * @param formName - Le nom du formulaire à vérifier.
     * @param controlName - Le nom du champ à vérifier.
     * @returns Vrai si le champ a été touché, faux sinon.
     */
    public static hasControlTouched(formName: string, controlName: string) {
        return this.formService.form(formName).get(controlName)?.touched || false;
    }

    /**
     * Vérifie si le champ en question du formulaire a une erreur.
     * @param formName - Le nom du formulaire à vérifier.
     * @param controlName - Le nom du champ à vérifier.
     * @param error - Le type d'erreur à vérifier.
     */
    public static hasError(formName: string, controlName: string, error: string): boolean {
        this.formService.selectForm = formName;
        return this.formService.checkControlErrors(controlName, error);
    }

    /**
     * Récupère le message d'erreur associé à un champ du formulaire.
     * @param formName - Le nom du formulaire à vérifier.
     * @param controlName - Le nom du champ à vérifier.
     * @param error - Le type d'erreur à vérifier.
     */
    public static getErrorMessage(formName: string, controlName: string, error: string): string | undefined {
        this.formService.selectForm = formName;
        return this.formService.getControlError(controlName, error)?.message;
    }
}