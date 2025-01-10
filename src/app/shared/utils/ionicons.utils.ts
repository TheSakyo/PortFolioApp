import { addIcons } from "ionicons";
import {
  arrowForwardOutline,
  briefcaseOutline,
  chevronBackOutline,
  chevronForwardOutline,
  homeOutline,
  informationCircleOutline,
  logoGithub,
  logoLinkedin,
  mailOutline,
  moon,
  searchOutline,
  sunny
} from 'ionicons/icons';

export abstract class IoniconsUtils {

  /**
   * Méthode permettant de charger les icônes de la bibliothèque 'Ionicons'.
   */
  public static loadIcons(): void {

      addIcons({
          'sunny': sunny, // Soleil
          'moon': moon, // Lune
          'search-outline': searchOutline, // Loupe
          'arrow-forward-outline': arrowForwardOutline, // Flèche vers l'avant
          'chevron-forward-outline': chevronForwardOutline, // Chevron vers l'avant
          'chevron-back-outline': chevronBackOutline, // Chevron vers l'arrière
          'briefcase-outline': briefcaseOutline, // Mallette
          'information-circle-outline': informationCircleOutline, // Cercle d'information
          'mail-outline': mailOutline, // Enveloppe
          'logo-linkedin': logoLinkedin, // Logo LinkedIn
          'logo-github': logoGithub, // Logo GitHub
          'home-outline': homeOutline, // Maison
      });
  }
}
