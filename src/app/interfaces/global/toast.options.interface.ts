import { EToastColor } from "src/app/enums/toast.color.enum";
import { EToastPosition } from "src/app/enums/toast.position.enum";
import { ToastOptions } from '@ionic/core';
import { EToastLayout } from "src/app/enums/toast.layout.enum";
import { EInterfaceMode } from "src/app/enums/interface.mode.enum";
import { EToastButtonSide } from "src/app/enums/toast.button.side.enum";
import { EToastSwipeGesture } from "src/app/enums/toast.swipe-gesture.enum";

/**
 * Interface personnalisée pour les options de notification toast,
 * qui étend les options de toast de Ionic tout en remplaçant certaines propriétés par défaut par des énumérations.
 */
export interface IToastOptions extends Omit<ToastOptions, 'buttons' | 'position' | 'swipeGesture' | 'layout' | 'color' | 'mode'> {
    
    buttons?: (EToastButtonSide | string)[]; // Boutons optionnels pour le toast avec l'aide d'une autre interface ou d'une chaîne de caractères
    position?: EToastPosition; // Position optionnelle pour le toast avec l'aide d'une énumération
    swipeGesture?: EToastSwipeGesture // Geste de balayage optionnel pour le toast avec l'aide d'une énumération
    layout?: EToastLayout; // Layout optionnel pour le toast avec l'aide d'une énumération
    color?: EToastColor; // Couleur optionnelle pour le toast avec l'aide d'une énumération
    mode?: EInterfaceMode; // Mode d'interface optionnel pour le toast avec l'aide d'une énumération
}