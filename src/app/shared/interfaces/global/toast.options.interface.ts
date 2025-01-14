import { EToastColor } from "src/app/shared/enums/toast.color.enum";
import { EToastPosition } from "src/app/shared/enums/toast.position.enum";
import { ToastOptions } from '@ionic/core';
import { EToastLayout } from "src/app/shared/enums/toast.layout.enum";
import { EInterfaceMode } from "src/app/shared/enums/interface.mode.enum";
import { EToastButtonSide } from "src/app/shared/enums/toast.button.side.enum";
import { EToastSwipeGesture } from "src/app/shared/enums/toast.swipe-gesture.enum";

/**
 * Interface personnalisée pour les options de notification toast,
 * qui étend les options de toast de Ionic tout en remplaçant certaines propriétés par défaut par des énumérations.
 */
export interface IToastOptions extends Omit<ToastOptions, 'buttons' | 'position' | 'swipeGesture' | 'layout' | 'color' | 'mode'> {

    /*****************************************************/
    /**************   ⬇️    PROPRIÉTÉS    ⬇️   **********/
    /****************************************************/

    /**
     * Boutons (optionnels) pour le toast avec l'aide d'une {@link EToastButtonSide énumération} ou d'une {@link string chaîne de caractères}.
     */
    buttons?: (EToastButtonSide | string)[];

    /**
     * Position (optionnelle) pour le toast avec l'aide d'une {@link EToastPosition énumération}.
     */
    position?: EToastPosition;

    /**
     * Geste de balayage (optionnel) pour le toast avec l'aide d'une {@link EToastSwipeGesture énumération}.
     */
    swipeGesture?: EToastSwipeGesture;

    /**
     * Layout (optionnel) pour le toast avec l'aide d'une {@link EToastLayout énumération}.
     */
    layout?: EToastLayout;

    /**
     * Couleur (optionnelle) pour le toast avec l'aide d'une {@link EToastColor énumération}.
     */
    color?: EToastColor;

    /**
     * Mode (optionnel) pour le toast avec l'aide d'une {@link EInterfaceMode énumération}.
     */
    mode?: EInterfaceMode;
}
