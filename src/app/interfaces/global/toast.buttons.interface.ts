import { ToastButton } from '@ionic/core';
import { EToastButtonSide } from 'src/app/enums/toast.button.side.enum';

/**
 * Interface personnalisée pour les boutons de notification toast,
 * qui étend les options de toast de Ionic tout en remplaçant certaines propriétés par défaut par des énumérations.
 */
export interface IToastButtons extends Omit<ToastButton, 'side'> {

    side?: EToastButtonSide; // Position optionnelle pour le bouton toast avec l'aide d'une énumération
}