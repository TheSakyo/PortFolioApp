import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { SeoService } from "../../../shared/services/seo.service";
import { FormService } from "../../../shared/services/form.service";
import { IFormComponent } from "../../../shared/interfaces/forms/form.component.interface";
import { ValidationErrorsWithMessageType } from "../../../shared/utils/types.utils";
import { FormsUtils } from "../../../shared/utils/forms.utils";

@Component({
  selector: 'sakyo-about-management',
  templateUrl: './about-management.component.html',
  styleUrls: ['./about-management.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AboutManagementComponent implements IFormComponent, OnInit {

  /*******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   ************/
  /******************************************************/

  /**
   * @public
   * Liste des compétences.
   */
  public skills: string[] = [];

  /**
   * @public
   * Indicateur d'état indiquant si un formulaire est en cours de soumission.
   */
  public isSubmitting = false;

  /**
   * @public
   * Messages d'erreurs pour chaque champ d'un formulaire.
   */
  public validationErrorsMessages: { [key: string]: ValidationErrorsWithMessageType } = {};

  /**
   * @private
   * Type de formulaire à gérer.
   */
  private formType!: 'aboutForm' | 'skillForm';

  /*******************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **********/
  /******************************************************/

  /**
   * Constructeur du composant de gestion des informations générales.
   * @param formService - Service pour gérer les formulaires de l'application.
   * @param seoService - Service correspondant à la gestion du SEO de l'application.
   */
  constructor(private formService: FormService, private seoService: SeoService) {
    FormsUtils.setFormService(formService); // Définit le service de formulaire pour sa méthode utilitaire
  }

  /***********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /**********************************************************/

  /**
   * Lors de l'initialisation du composant, on initialise les formulaires.
   * On définit également les données SEO de la page.
   */
  ngOnInit() {

    this.initForms(); // Initialisation des formulaires

    /*
     * On définit les données SEO de la page.
     */
    this.seoService.setSeoData('Gestion Générale - PortFolio',
        {
          'description': 'Gérez les informations générales du portfolio, tel que la présentation générale, ' +
              'les compétences, le parcours professionnel, etc.'
        }
    );
  }

  /*********************************************************/
  /**************   ⬇️    ÉVÈNEMENTS    ⬇️   **************/
  /********************************************************/

  /**
   * Méthode appelée lors de la saisie d'un champ du formulaire demandé.
   * @param event - L'évènement déclenché lors de la saisie.
   * @param formName - Le nom du formulaire en question.
   */
  public onInput(event: Event, formName: string): void {

    // Permettra de stocker les messages d'erreurs pour chaque champ du formulaire en question.
    let validationErrorsMessages: ValidationErrorsWithMessageType | null = null;

    // Récupère le champ de saisie sur lequel l'évènement a été déclenché.
    const target = event.target as HTMLInputElement;

    /*
     * En fonction du nom du formulaire récupéré, on essaie de récupérer les messages d'erreurs correspondants.
     */
    switch(formName) {

      /*
       * Essaie de récupérer les messages d'erreurs pour le formulaire 'aboutForm'.
       */
      case 'aboutForm':

        // Récupère les messages d'erreurs pour chaque champ du formulaire 'aboutForm'.
        validationErrorsMessages = this.validationErrorsMessages['aboutForm'];
        break; // Sort du switch

      /*
       * Essaie de récupérer les messages d'erreurs pour le formulaire 'skillForm'.
       */
      case 'skillForm':

        // Récupère les messages d'erreurs pour chaque champ du formulaire 'skillForm'.
        validationErrorsMessages = this.validationErrorsMessages['skillForm'];
        break; // Sort du switch
    }

    // Vérifie si le champ est valide et s'il y a des messages d'erreurs à afficher, alors, on les affiche.
    if(target.validity.valid && validationErrorsMessages) this.formService.updateControlErrors(validationErrorsMessages)
  }

  /**
   * Méthode appelée lors de la soumission d'un formulaire.
   */
  public onSubmit(): void {

    this.isSubmitting = true; // Le formulaire est en cours de soumission

    /*
     * En fonction du type de formulaire, on effectue une action spécifique.
     */
    switch(this.formType) {

      /*
       * Sauvegarde les informations générales.
       */
      case 'aboutForm':
        console.log(this.formService.form('aboutForm').value); // Affiche les informations générales
        this.onReset('aboutForm'); // Réinitialise le formulaire
        break; // Sort du switch

      /*
       * Ajoute une compétence à la liste des compétences.
       */
      case 'skillForm':

        const form: FormGroup = this.formService.form('skillForm'); // Récupère le formulaire en question
        if(form.invalid) return; // Vérifie si le formulaire est invalide

        let skill = form.value.skill; // Récupère la compétence saisie
        if(!skill || this.skills.includes(skill)) return; // Vérifie si la compétence est déjà présente

        this.skills.push(skill); // Ajoute la compétence à la liste
        this.onReset('skillForm'); // Réinitialise le formulaire
        break; // Sort du switch
    }
  }

  /**
   * Méthode appelée lors de la réinitialisation d'un formulaire.
   * @param formName - Le nom du formulaire à réinitialiser.
   */
  public onReset(formName: string): void {
    this.form(formName).reset(); // Réinitialise le formulaire
    this.isSubmitting = false; // Le formulaire n'est plus en cours de soumission
  }

  /*******************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /******************************************************/

  /**************************/
  /*** MÉTHODES GÉNÉRALES ***/
  /**************************/

  /**
   * Sauvegarde les informations générales.
   */
  public saveIntroduction() : void {
    this.formType = 'aboutForm'; // On définit le type de formulaire
    this.onSubmit(); // On soumet le formulaire
  }

  /**
   * Ajoute une compétence à la liste des compétences.
   */
  public addSkill() : void {
    this.formType = 'skillForm'; // On définit le type de formulaire
    this.onSubmit(); // On soumet le formulaire
  }

  /**
   * Supprime une compétence de la liste des compétences.
   * @param skill - La compétence que l'on souhaite supprimer.
   */
  public deleteSkill(skill: string) : void {
    this.skills = this.skills.filter(s => s !== skill);
  }

  /**
   * Édite une compétence de la liste des compétences dans le formulaire.
   * @param formName - Le nom du formulaire à récupérer.
   * @param skill - La compétence que l'on souhaite éditer.
   */
  public editSkill(formName: string, skill: string) : void {
    this.form(formName).patchValue({ skill });
  }

  /********************************/
  /***  MÉTHODES DE FORMULAIRE  ***/
  /********************************/

  /**
   * Récupère le formulaire en question.
   * @param formName - Le nom du formulaire à récupérer.
   */
  public form(formName: string) : FormGroup {
    return this.formService.form(formName);
  }

  /**
   * Initialise les messages d'erreurs par défaut pour le formulaire en question.
   * @param formName - Le nom du formulaire à initialiser.
   */
  public initErrorsMessages(formName: string) : void {

    /*
     * En fonction du nom du formulaire récupéré, on initialise les messages d'erreurs.
     */
    switch(formName) {

      /*
       * Initialisation des messages d'erreurs pour le formulaire 'aboutForm'.
       */
      case 'aboutForm':

        /*
         * Messages d'erreurs pour chaque champ du formulaire 'aboutForm'.
         */
        this.validationErrorsMessages['aboutForm'] = {
          'greeting': [{ type: 'required', message: 'Le message de bienvenue est requis.' }],
          'name': [{ type: 'required', message: 'Le nom est requis.' }],
          'title': [{ type: 'required', message: 'Le titre est requis.' }],
          'bio': [{ type: 'required', message: 'La biographie est requise.' }],
        };

        // Initialise des messages d'erreurs par défaut pour le formulaire 'aboutForm'.
        this.formService.initDefaultErrorMessages(this.validationErrorsMessages['aboutForm']);
        break; // Sort du switch

      /*
       * Initialisation des messages d'erreurs pour le formulaire 'skillForm'.
       */
      case 'skillForm':

        /*
          * Messages d'erreurs pour chaque champ du formulaire 'skillForm'.
          */
        this.validationErrorsMessages['skillForm'] = {
          'skill': [{ type: 'required', message: 'La compétence est requise.' }]
        };

        // Initialise des messages d'erreurs par défaut pour le formulaire 'skillForm'.
        this.formService.initDefaultErrorMessages(this.validationErrorsMessages['skillForm']);
        break; // Sort du switch
    }
  }

  /**
   * Vérifie si le champ en question du formulaire demandé a été 'touché' et contient une erreur spécifique.
   * @param controlName - Le nom du champ à vérifier.
   * @param error - Le type d'erreur à vérifier.
   * @param formName - Le nom du formulaire à vérifier.
   */
  public containsError(controlName: string, error: string, formName: string): boolean {
    return FormsUtils.hasControlTouched(formName, controlName) && FormsUtils.hasError(formName, controlName, error);
  }

  /**
   * Récupère le message d'erreur associé à un champ du formulaire en question.
   * @param controlName - Le nom du champ à vérifier.
   * @param error - Le type d'erreur à vérifier.
   * @param formName - Le nom du formulaire à vérifier.
   */
  public errorMessage(controlName: string, error: string, formName: string): string | undefined {
    return FormsUtils.getErrorMessage(formName, controlName, error);
  }

  /**************************/
  /***  MÉTHODES PRIVÉES  ***/
  /**************************/

  /**
   * Initialise les formulaires de gestion des informations générales et des compétences.
   */
   private initForms() : void {

     /*
      * Création du formulaire de gestion des informations générales avec les validations nécessaires pour chaque champ.
      */
     this.formService.createForm('aboutForm', {
       greeting: new FormControl('', Validators.required),
       name: new FormControl('', Validators.required),
       title: new FormControl('', Validators.required),
       bio: new FormControl('', Validators.required)
     });

     /*
      * Création du formulaire de gestion des compétences avec une validation nécessaire pour le champ en question.
      */
     this.formService.createForm('skillForm', {
       skill: new FormControl('', Validators.required)
     });

     this.initErrorsMessages('aboutForm'); // Initialisation des messages d'erreurs pour le formulaire 'aboutForm'
     this.initErrorsMessages('skillForm'); // Initialisation des messages d'erreurs pour le formulaire 'skillForm'
   }
}

