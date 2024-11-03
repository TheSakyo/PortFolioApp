import { addIcons } from "ionicons";
import { arrowForwardOutline, briefcaseOutline, chevronBackOutline, chevronForwardOutline, informationCircleOutline, logoGithub, logoLinkedin, mailOutline, moon, searchOutline, sunny } from 'ionicons/icons';

export abstract class IoniconsUtils {

    public static loadIcons(): void {
        
        addIcons({
            'sunny': sunny,
            'moon': moon,
            'search-outline': searchOutline,
            'arrow-forward-outline': arrowForwardOutline,
            'chevron-forward-outline': chevronForwardOutline,
            'chevron-back-outline': chevronBackOutline,
            'briefcase-outline': briefcaseOutline,
            'information-circle-outline': informationCircleOutline,
            'mail-outline': mailOutline,
            'logo-linkedin': logoLinkedin,
            'logo-github': logoGithub
        });
    }
}