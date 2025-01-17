import { AbstractControl } from "@angular/forms";
import { IFormError } from "@portfolio/shared/interfaces/forms/form.error.interface";
import { FormService } from "@portfolio/shared/services/common/form.service";
import { FormControlError } from "@portfolio/shared/utils/types.utils";

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
     * @param controlError - Les informations sur le champ et le nom de l'erreur qui doit être vérifiée.
     */
    public static hasError(formName: string, controlError: FormControlError): boolean {

        this.formService.selectForm = formName;

        switch(controlError.type) {
            case 'ANY':
                return this.formService.getControlErrors(controlError.targetName).length > 0;
            default:
                return this.formService.checkControlErrors(controlError.targetName, controlError.type);
        }
    }

    /**
     * Récupère le message d'erreur associé à un champ du formulaire.
     * @param formName - Le nom du formulaire à vérifier.
     * @param controlError - Les informations sur le champ et le nom de l'erreur qui doit être vérifiée.
     * @param onlyValidError - Indique si on doit récupérer seulement les erreurs valides.
     */
    public static getErrorMessage(formName: string, controlError: FormControlError, onlyValidError: boolean = false): string | undefined {

        const formControl: AbstractControl | null = this.formService.formControl(formName, controlError.targetName);

        let errors: IFormError[] = this.formService.getControlErrors(controlError.targetName);
        if(onlyValidError) errors = errors.filter(error => formControl && error.validator(formControl));

        this.formService.selectForm = formName;

        switch(controlError.type) {

            case 'ANY':
                if(errors) return errors.length > 0 ? errors[0].message : undefined;
                return undefined;
            default:
                if(errors) {
                    if(onlyValidError) errors = errors.filter(error => error.type === controlError.type);
                    return errors.length > 0 ? errors.map(error => error.message).join(' - ') : undefined;
                }
                return undefined;
        }
    }
}