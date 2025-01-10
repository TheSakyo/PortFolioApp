import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastService } from '../../../shared/services/toast.service';
import { EToastColor } from 'src/app/shared/enums/toast.color.enum';
import { AnimationService } from 'src/app/shared/services/animation.service';
import { EToastPosition } from 'src/app/shared/enums/toast.position.enum';

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
export class ContactComponent implements OnInit {

  /****************************************************/
  /**************   ⬇️    PROPRIÉTÉS    ⬇️   ************/
  /****************************************************/

  public contactForm: FormGroup; // Formulaire de contact, utilisé pour capturer les données utilisateur.
  public isSubmitting = false; // Indicateur d'état indiquant si le formulaire est en cours de soumission.

  private toastPosition: EToastPosition = EToastPosition.BOTTOM; // Position de la notification toast.

  /****************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **********/
  /****************************************************/

  /**
   * Constructeur du composant de la page de contact.
   * On initialise le formulaire de contact et ses champs avec des validations.
   * @param elementRef - Référence à l'élément racine du composant.
   * @param fb - Service de création de formulaires pour gérer les formulaires.
   * @param toastService - Service pour gérer l'affichage des notifications toast.
   * @param animationService - Le service correspondant à la gestion des animations de l'application.
   */
  constructor(private elementRef: ElementRef, private fb: FormBuilder,
              private toastService: ToastService, private animationService: AnimationService) {

    /**
     * Définition des contrôles du formulaire et des validations pour chaque champ.
     */
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]], // Champ du nom de l'expéditeur
      email: ['', [Validators.required, Validators.email]], // Champ de l'adresse email de l'expéditeur
      subject: ['', [Validators.required, Validators.minLength(3)]], // Champ du sujet de l'email
      message: ['', [Validators.required, Validators.minLength(10)]] // Champ du message de l'email
    });
  }

  /********************************************************/
  /**************   ⬇️    CYCLE DE VIE    ⬇️   **************/
  /********************************************************/

  /**
   * Lors de l'initialisation du composant, on initialise l'animation du scroll.
   */
  ngOnInit() {
    this.animationService.initScroll(this.elementRef); // Initialisation de l'animation du scroll à l'aide de son service
  }

  /****************************************************/
  /**************   ⬇️    MÉTHODES    ⬇️   **************/
  /****************************************************/

  /**
   * Soumet le formulaire de contact. Vérifie si le formulaire est valide,
   * puis simule l'envoi du message. Affiche une notification toast avec le résultat.
   */
  async onSubmit() {

    /**
     * Vérifie si le formulaire est valide, alors, on vérifie
     * les informations saisies par l'utilisateur, puis, on le soumet.
     */
    if(this.contactForm.valid) {

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

        this.contactForm.reset(); // Réinitialise le formulaire après l'envoi.

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

      // Finalement, on réinitialise l'indicateur de soumission.
      finally { this.isSubmitting = false; }

    /**
     * Sinon, on demande à l'utilisateur de remplir tous les champs correctement
     */
    } else {

      // Marque tous les champs comme touchés pour afficher les erreurs si le formulaire est invalide.
      this.contactForm.markAllAsTouched();

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
}
