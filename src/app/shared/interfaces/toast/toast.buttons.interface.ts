import { ToastButton } from '@ionic/core';
import { EToastButtonSide } from "@portfolio/shared/enums/toast/toast.button.side.enum";

/**
 * Interface personnalisée pour les boutons de notification toast,
 * qui étend les options de toast de Ionic tout en remplaçant certaines propriétés par défaut par des énumérations.
 */
export interface IToastButtons extends Omit<ToastButton, 'side'> {

    /*****************************************************/
    /**************   ⬇️    PROPRIÉTÉS    ⬇️   **********/
    /****************************************************/

    /**
     * Position (optionnelle) pour le bouton toast avec l'aide d'une {@link EToastButtonSide énumération}.
     */
    side?: EToastButtonSide;
}
