import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastService } from '../../../shared/services/toast.service';
import { EToastColor } from 'src/app/shared/enums/toast.color.enum';
import { AnimationService } from 'src/app/shared/services/animation.service';
import { EToastPosition } from 'src/app/shared/enums/toast.position.enum';
import { SeoService } from "../../../shared/services/seo.service";
import { FormService } from "../../../shared/services/form.service";
import { ValidationErrorsWithMessageType } from "../../../shared/utils/types.utils";
import { FormsUtils } from "../../../shared/utils/forms.utils";
import { IFormComponent } from "../../../shared/interfaces/forms/form.component.interface";

@Component({
  selector: 'sakyo-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactComponent implements IFormComponent, OnInit {

  /*******************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   ************/
  /******************************************************/

  /**
   * @public
   * Indicateur d'état indiquant si le formulaire est en cours de soumission.
   */
  public isSubmitting = false;

  /**
   * @public
   * Messages d'erreurs pour chaque champ du formulaire.
   */
  public validationErrorsMessages: { [key: string]: ValidationErrorsWithMessageType } = {};

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

    console.log(this.form().errors);

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
   */
  public onInput(event: Event): void {

    // Récupère les messages d'erreurs pour chaque champ du formulaire.
    let validationErrorsMessages: ValidationErrorsWithMessageType  = this.validationErrorsMessages['contactForm'];

    // Récupère le champ de saisie sur lequel l'évènement a été déclenché.
    const target = event.target as HTMLInputElement;

    // Vérifie si le champ est valide, alors, on le marque comme 'touched'.
    if(target.validity.valid && validationErrorsMessages) this.formService.updateControlErrors(validationErrorsMessages)
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
    this.validationErrorsMessages['contactForm'] = {
      name: [
        { type: 'required', message: 'Votre nom est requis.' },
        //{ type: 'minlength', message: 'Le nom doit contenir au moins 2 caractères.' }
      ],
      email: [
        { type: 'required', message: 'Votre adresse email est requise.' },
        //{ type: 'email', message: 'Votre adresse email n\'est pas valide.' }
      ],
      subject: [
        { type: 'required', message: 'Le sujet est requis.' },
        //{ type: 'minlength', message: 'Le sujet doit contenir au moins 3 caractères.' }
      ],
      message: [
        { type: 'required', message: 'Un message est requis.' },
        //{ type: 'minlength', message: 'Le message doit contenir au moins 10 caractères.' }
      ]
    };

    // Initialise des messages d'erreurs par défaut pour le formulaire
    this.formService.initDefaultErrorMessages(this.validationErrorsMessages['contactForm']);
  }

  /**
   * Vérifie si le champ en question du formulaire demandé a été 'touché' et contient une erreur spécifique.
   * @param controlName - Le nom du champ à vérifier.
   * @param error - Le type d'erreur à vérifier.
   */
  public containsError(controlName: string, error: string): boolean {
    return FormsUtils.hasControlTouched('contactForm', controlName) && FormsUtils.hasError('contactForm', controlName, error);
  }

  /**
   * Récupère le message d'erreur associé à un champ du formulaire en question.
   * @param controlName - Le nom du champ à vérifier.
   * @param error - Le type d'erreur à vérifier.
   */
  public errorMessage(controlName: string, error: string): string | undefined {
    return FormsUtils.getErrorMessage('contactForm', controlName, error);
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

      name: new FormControl('', [Validators.minLength(2), Validators.required]), // Champ du nom de l'expéditeur
      email: new FormControl('', [Validators.email, Validators.required]), // Champ de l'adresse email de l'expéditeur
      subject: new FormControl('', [Validators.minLength(3), Validators.required]), // Champ du sujet de l'email
      message: new FormControl('', [Validators.minLength(10), Validators.required]) // Champ du message de l'email
    });

    this.initErrorsMessages(); // Initialisation des messages d'erreurs pour le formulaire
  }
}
