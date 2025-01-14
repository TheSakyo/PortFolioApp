import { Observable } from "rxjs";

export abstract class AsynchroneCheckUtils {

    /**
     * Vérifie si une valeur est une promesse.
     * @param value - La valeur qui doit être vérifiée.
     * @returns - Le résultat de la vérification.
     */
    public static isPromise(value: any): boolean {

        if(!value) return false;

        const isInstanceOfPromise = value instanceof Promise;
        return isInstanceOfPromise || typeof value.then === 'function';
    }

    /**
     * Vérifie si une valeur est un observable.
     * @param value - La valeur qui doit être vérifiée.
     * @returns - Le résultat de la vérification.
     */
    public static isObservable(value: any): boolean {

        if(!value) return false;

        const isInstanceOfObservable = value instanceof Observable;
        return isInstanceOfObservable || typeof value.subscribe === 'function';
    }
}