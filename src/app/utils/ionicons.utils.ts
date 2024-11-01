import { addIcons } from "ionicons";
import { arrowForwardOutline, briefcaseOutline, informationCircleOutline, mailOutline, moon, sunny } from 'ionicons/icons';

export abstract class IoniconsUtils {

    public static loadIcons(): void {
        
        addIcons({
            'sunny': sunny,
            'moon': moon,
            'arrow-forward-outline': arrowForwardOutline,
            'briefcase-outline': briefcaseOutline,
            'information-circle-outline': informationCircleOutline,
            'mail-outline': mailOutline
        });
    }
}