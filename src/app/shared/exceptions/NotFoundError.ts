export class NotFoundError extends Error {

    /*********************************************************/
    /**************   ⬇️    PROPRIÉTÉS    ⬇️   **************/
    /********************************************************/

    /**
     * @private
     * La cible de l'erreur.
     */
    private readonly targetNotFound: any;

    /***********************************************************/
    /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
    /**********************************************************/

    /**
     * Constructeur de l'erreur {@link NotFoundError}.
     * @param message - Le message d'erreur.
     * @param target - La cible de l'erreur.
     */
    constructor(message: string, target?: any) {

        super(message); // Appel du constructeur de la classe mère

        this.name = 'NotFoundError'; // Définition du nom de l'erreur
        this.message = message; // Définition du message d'erreur
        this.targetNotFound = target; // Définition de la cible de l'erreur
    }

    /******************************************************/
    /**************   ⬇️    GETTERS    ⬇️   **************/
    /*****************************************************/

    /**
     * Récupère la cible de l'erreur.
     */
    public get target(): any { return this.targetNotFound; }
}