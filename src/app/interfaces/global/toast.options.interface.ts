import { EToastColor } from "src/app/enums/toast.color.enum";
import { EToastPosition } from "src/app/enums/toast.position.enum";
import { ToastOptions } from '@ionic/core';

/**
 * Interface personnalisée pour les options de notification toast,
 * qui étend les options de toast de Ionic tout en remplaçant les propriétés 
 * par défaut pour la couleur (color) et la position (position) par des énumérations.
 */
export interface IToastOptions extends Omit<ToastOptions, 'color' | 'position'> {

    color?: EToastColor; // Couleur optionnelle pour le toast avec l'aide d'une énumération
    position?: EToastPosition; // Position optionnelle pour le toast avec l'aide d'une énumération
}