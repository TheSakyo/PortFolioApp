export class NotValidError extends Error {

    /**
     * Constructeur de l'erreur {@link NotValidError}.
     * @param message - Le message d'erreur.
     */
    constructor(message: string) {

        super(message); // Appel du constructeur de la classe mère

        this.name = 'NotValidError'; // Définition du nom de l'erreur
        this.message = message; // Définition du message d'erreur
    }
}