import { addIcons } from "ionicons";
import * as Ionicons from 'ionicons/icons';

export abstract class IoniconsUtils {

  /**
   * Méthode permettant de charger les icônes de la bibliothèque 'Ionicons'.
   */
  public static loadIcons(): void {

    /**
     * Ajoute les icônes de la bibliothèque 'Ionicons' à l'application.
     */
      addIcons({
          'sunny': Ionicons.sunny, // Soleil
          'moon': Ionicons.moon, // Lune
          'search-outline': Ionicons.searchOutline, // Loupe
          'arrow-forward-outline': Ionicons.arrowForwardOutline, // Flèche vers l'avant
          'chevron-forward-outline': Ionicons.chevronForwardOutline, // Chevron vers l'avant
          'chevron-back-outline': Ionicons.chevronBackOutline, // Chevron vers l'arrière
          'briefcase-outline': Ionicons.briefcaseOutline, // Mallette
          'information-circle-outline': Ionicons.informationCircleOutline, // Cercle d'information
          'mail-outline': Ionicons.mailOutline, // Enveloppe
          'logo-linkedin': Ionicons.logoLinkedin, // Logo LinkedIn
          'logo-github': Ionicons.logoGithub, // Logo GitHub
          'home-outline': Ionicons.homeOutline, // Maison
      });
  }
}
