import { Observable } from "rxjs";

export abstract class AsynchroneCheckUtils {

    /************************************************************************/
    /**************   ⬇️    PROPRIÉTÉS AVEC FONCTIONS    ⬇️   **************/
    /************************************************************************/


    /**
     * Vérifie si une valeur est une promesse.
     * @param value - La valeur qui doit être vérifiée.
     * @returns - Le résultat de la vérification.
     */
    private static isInstanceOfPromise: (value: any) => boolean = (value: any) => value instanceof Promise;

    /**
     * Vérifie si une valeur est un observable.
     * @param value - La valeur qui doit être vérifiée.
     * @returns - Le résultat de la vérification.
     */
    private static isInstanceOfObservable: (value: any) => boolean = (value: any) => value instanceof Observable;


    /*******************************************************/
    /**************   ⬇️    MÉTHODES    ⬇️   **************/
    /******************************************************/


    /**
     * Vérifie si une valeur est une promesse.
     * @param value - La valeur qui doit être vérifiée.
     * @returns - Le résultat de la vérification.
     */
    public static isPromise(value: any): boolean {

        if(!value) return false;

        if(Array.isArray(value)) {

            for(const item of value) {
                if(!this.isInstanceOfPromise(item) && typeof item.then !== 'function') return false;
            }

            return true;

        } else return this.isInstanceOfPromise(value) || typeof value.then === 'function';
    }

    /**
     * Vérifie si une valeur est un observable.
     * @param value - La valeur qui doit être vérifiée.
     * @returns - Le résultat de la vérification.
     */
    public static isObservable(value: any): boolean {

        if(!value) return false;

        if(Array.isArray(value)) {

            for(const item of value) {
                if(!this.isInstanceOfObservable(item) && typeof item.subscribe !== 'function') return false;
            }

            return true;

        } else return this.isInstanceOfObservable(value) || typeof value.subscribe === 'function';
    }
}