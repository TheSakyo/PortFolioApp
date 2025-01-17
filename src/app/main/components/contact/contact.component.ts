import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EToastColor } from "@portfolio/shared/enums/toast/toast.color.enum";
import { EToastPosition } from "@portfolio/shared/enums/toast/toast.position.enum";
import { IFormComponent } from "@portfolio/shared/interfaces/forms/form.component.interface";
import { AnimationService } from "@portfolio/shared/services/common/animation.service";
import { FormService } from "@portfolio/shared/services/common/form.service";
import { SeoService } from "@portfolio/shared/services/common/seo.service";
import { ToastService } from "@portfolio/shared/services/common/toast.service";
import { FormsUtils } from "@portfolio/shared/utils/forms.utils";
import { FormControlError } from "@portfolio/shared/utils/types.utils";

@Component({
  selector: 'portfolio-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class ContactComponent implements IFormComponent, OnInit {

  /*******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   ************/
  /******************************************************/

  /**
   * @public
   * Indicateur d'état indiquant si le formulaire est en cours de soumission.
   */
  public isSubmitting: boolean = false;

  /**
   * @private
   * Position de la notification toast.
   */
  private toastPosition: EToastPosition = EToastPosition.BOTTOM;

  /*******************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **********/
  /******************************************************/

  /**
   * Constructeur du composant de la page de contact.
   * @param elementRef - Référence à l'élément racine du composant.
   * @param formService - Service pour gérer les formulaires de l'application.
   * @param toastService - Service pour gérer l'affichage des notifications toast.
   * @param animationService - Le service correspondant à la gestion des animations de l'application.
   * @param seoService - Le service correspondant à la gestion du SEO de l'application.
   */
  constructor(private elementRef: ElementRef, private formService: FormService,
              private toastService: ToastService, private animationService: AnimationService,
              private seoService: SeoService) {

    FormsUtils.setFormService(formService); // Définit le service de formulaire pour sa méthode utilitaire
  }

  /***********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /**********************************************************/

  /**
   * Lors de l'initialisation du composant, on initialise l'animation du scroll.
   */
  ngOnInit() {

    this.initForm(); // Initialisation du formulaire de contact

    // Initialisation de l'animation du scroll à l'aide de son service
    this.animationService.initScroll(this.elementRef);

    /*
     * On définit les données SEO de la page.
     */
    this.seoService.setSeoData('Contact - PortFolio de Sacha',
        {
          'description': 'N\'hésitez pas à me contacter pour qu\'on puisse avoir un échange constructif.',
          'keywords': 'contact, portfolio, projet, développement, échange, constructif, sacha cardone'
        }
    );
  }

  /*********************************************************/
  /**************   ⬇️    ÉVÈNEMENTS    ⬇️   **************/
  /********************************************************/

  /**
   * Méthode appelée lors de la saisie d'un champ du formulaire.
   * @param event - L'évènement déclenché lors de la saisie.
   * @param controlName - Nom du champ à vérifier.
   */
  public onInput(event: Event, controlName: string): void {

    // Récupère le champ de saisie sur lequel l'évènement a été déclenché.
    const target = event.target as HTMLInputElement;

    /*
     * Vérifie si le champ est valide, alors, on met à jour les erreurs du formulaire
     * (permettant de les afficher ou non)
     */
    if(target.validity.valid) this.formService.updateFormControlErrors('contactForm', controlName);
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   */
  public async onSubmit(): Promise<void> {

    /**
     * Vérifie si le formulaire est valide, alors, on vérifie
     * les informations saisies par l'utilisateur, puis, on le soumet.
     */
    if(this.form().valid) {

      // Déclenche l'indicateur de soumission pour indiquer un envoi en cours.
      this.isSubmitting = true;

      /**
       * On essaie d'envoyer le formulaire en vérifiant les informations de saisies.
       */
      try {

        // Simulation d'un appel API pour l'envoi du formulaire.
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Affiche un message de succès avec l'aide de son service associé.
        await this.toastService.present({
          message: 'Message envoyé avec succès !', // Message de la notification
          color: EToastColor.SUCCESS, // Couleur de la notification
          position: this.toastPosition // Position de la notification
        });

        /**
         * En cas d'erreur, on affiche un message d'erreur toujours avec l'aide de son service associé.
         */
      } catch(error) {

        /**
         * Affiche un message d'erreur toujours avec l'aide de son service associé.
         */
        await this.toastService.present({
          message: 'Erreur lors de l\'envoi du message.', // Message de la notification
          color: EToastColor.DANGER, // Couleur de la notification
          position: this.toastPosition // Position de la notification
        });
      }

      // Finalement, on réinitialise le formulaire.
      finally { this.onReset(); }

      /**
       * Sinon, on demande à l'utilisateur de remplir tous les champs correctement
       */
    } else {

      // Marque tous les champs comme touchés pour afficher les erreurs si le formulaire est invalide.
      this.formService.markAsTouched();

      /**
       * Affiche une notification toast toujours avec l'aide de son service associé pour
       * inviter l'utilisateur à remplir correctement tous les champs.
       */
      await this.toastService.present({
        message: 'Veuillez remplir tous les champs correctement.', // Message de la notification
        color: EToastColor.WARNING, // Couleur de la notification
        position: this.toastPosition // Position de la notification
      });
    }
  }

  /**
   * Méthode appelée lors de la réinitialisation d'un formulaire.
   */
  public onReset(): void {
    this.form().reset(); // Réinitialise le formulaire
    this.isSubmitting = false; // Le formulaire n'est plus en cours de soumission
  }

  /*******************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /******************************************************/

  /********************************/
  /***  MÉTHODES DE FORMULAIRE  ***/
  /********************************/

  /**
   * Récupère le formulaire.
   */
  public form() : FormGroup { return this.formService.form(); }

  /**
   * Initialise les messages d'erreurs par défaut pour le formulaire.
   */
  public initErrorsMessages() : void {

    /*
     * Messages d'erreurs personnalisés pour chaque champ du formulaire.
     */
    this.formService.initFormErrorMessages('contactForm', {
      name: [
        { type: 'required', message: 'Votre nom est requis.', validator: Validators.required },
        { type: 'minlength', message: 'Le nom doit contenir au moins 2 caractères.', validator: Validators.minLength(2) }
      ],
      email: [
        { type: 'required', message: 'Votre adresse email est requise.', validator: Validators.required },
        { type: 'email', message: 'Votre adresse email n\'est pas valide.', validator: Validators.email }
      ],
      subject: [
        { type: 'required', message: 'Le sujet est requis.', validator: Validators.required },
        { type: 'minlength', message: 'Le sujet doit contenir au moins 3 caractères.', validator: Validators.minLength(3) }
      ],
      message: [
        { type: 'required', message: 'Un message est requis.', validator: Validators.required },
        { type: 'minlength', message: 'Le message doit contenir au moins 10 caractères.', validator: Validators.minLength(10) }
      ]
    });
  }

  /**
   * Vérifie si le champ en question du formulaire a été 'touché' et contient une erreur spécifique.
   * @param controlError - Le type d'erreur à vérifier avec son contrôle associé.
   * @returns Vrai si le champ a été touché et contient une erreur spécifique, faux sinon.
   */
  public containsError(controlError: FormControlError): boolean {
    return FormsUtils.hasControlTouched('contactForm', controlError.targetName)
        && FormsUtils.hasError('contactForm', controlError);
  }

  /**
   * Récupère le message d'erreur associé à un champ du formulaire.
   * @param controlError - Le type d'erreur à vérifier avec son contrôle associé.
   * @returns Le message d'erreur associé au champ du formulaire.
   */
  public errorMessage(controlError: FormControlError): string | undefined {
    return FormsUtils.getErrorMessage('contactForm', controlError, true);
  }

  /**************************/
  /***  MÉTHODES PRIVÉES  ***/
  /**************************/

  /**
   * Initialise le formulaire de contact.
   */
  private initForm() : void {

    /*
     * Création du formulaire de contact avec les validations nécessaires pour chaque champ.
     */
    this.formService.createForm('contactForm', {

      name: { value: '' }, // Champ du nom de l'expéditeur
      email: { value: '' }, // Champ de l'adresse email de l'expéditeur
      subject: { value: '' }, // Champ du sujet de l'email
      message: { value: '' }, // Champ du message de l'email
    });

    this.initErrorsMessages(); // Initialisation des messages d'erreurs pour le formulaire
  }
}
